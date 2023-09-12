using Microsoft.EntityFrameworkCore;
using SupplyChainManagement;
using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Services;


var builder = WebApplication.CreateBuilder(args);

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
builder.Services.AddSwaggerGen();

var dbconnection = builder.Configuration.GetConnectionString("postgresconnection");

builder.Services.AddDbContext<ProjectDbContext>(options => options.UseNpgsql(dbconnection));

// CORS ORIGIN Handling 

builder.Services.AddCors(options =>
    options.AddPolicy("MyPolicy",
        builder => {
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
    )
);

//var logger = builder.Build();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.UseCors("MyPolicy");

app.Run();
