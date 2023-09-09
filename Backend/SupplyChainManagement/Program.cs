using Microsoft.EntityFrameworkCore;
using SupplyChainManagement;
using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddMvc();
//Add Repo Scoped Interfaces and Classes 

builder.Services.AddTransient<IInventRepo, InventRepo>();
builder.Services.AddTransient<ILocationRepo, LocationRepo>();
builder.Services.AddTransient<IProdRepo, ProdRepo>();
builder.Services.AddTransient<IOrderRepo, OrderRepo>();
builder.Services.AddTransient<IShipmentRepo, ShipmentRepo>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var dbconnection = builder.Configuration.GetConnectionString("postgresconnection");

builder.Services.AddDbContext<ProjectDbContext>(options => options.UseNpgsql(dbconnection));

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

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
