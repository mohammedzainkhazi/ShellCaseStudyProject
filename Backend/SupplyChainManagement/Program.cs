using Microsoft.EntityFrameworkCore;
using SupplyChainManagement;
using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Repository;
using SupplyChainManagement.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddMvc();
//Add Repo Scoped Interfaces and Classes 

builder.Services.AddScoped<IInventRepo, InventRepo>();
builder.Services.AddScoped<ILocationRepo, LocationRepo>();
builder.Services.AddScoped<IProdRepo, ProdRepo>();
builder.Services.AddScoped<IOrderRepo, OrderRepo>();
builder.Services.AddScoped<IShipmentRepo, ShipmentRepo>();
builder.Services.AddScoped<InventoryService, InventoryService>();
builder.Services.AddScoped<LocationService, LocationService>();
builder.Services.AddScoped<ProductService, ProductService>();
builder.Services.AddScoped<OrderService, OrderService>();
builder.Services.AddScoped<ShipmentService, ShipmentService>();

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

app.Run();
