using Microsoft.EntityFrameworkCore;
using SupplyChainManagement;
using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Services;
using Serilog;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});


// Serilog Configuration 
var logger = new LoggerConfiguration().WriteTo.File("Logs.txt", rollingInterval: RollingInterval.Hour).CreateLogger();
builder.Logging.AddSerilog(logger);
// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddMvc();
//Add Repo Scoped Interfaces and Classes 

builder.Services.AddScoped<InventRepo>();
builder.Services.AddScoped<LocationRepo>();
builder.Services.AddScoped<ProdRepo>();
builder.Services.AddScoped<OrderRepo>();
builder.Services.AddScoped<ShipmentRepo>();
builder.Services.AddScoped<UserRepo>();
builder.Services.AddScoped<InventoryService>();
builder.Services.AddScoped<LocationService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<ShipmentService>();
builder.Services.AddScoped<UserService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Supply Chain Management",
        Description = "Supply Chain Management System API",
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."

    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                          new OpenApiSecurityScheme
                          {
                              Reference = new OpenApiReference
                              {
                                  Type = ReferenceType.SecurityScheme,
                                  Id = "Bearer"
                              }
                          },
                         new string[] {}
                    }
                });
});


var dbconnection = builder.Configuration.GetConnectionString("postgresconnection");

builder.Services.AddDbContext<ProjectDbContext>(options => options.UseNpgsql(dbconnection));

// CORS ORIGIN Handling 

//builder.Services.AddCors(options =>
//    options.AddPolicy("MyPolicy",
//        builder => {
//            builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
//        }
//    )
//);

//var logger = builder.Build();

var app = builder.Build();

app.UseCors(x => x.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

//app.MapControllers();

app.UseCors("MyPolicy");

app.Run();
