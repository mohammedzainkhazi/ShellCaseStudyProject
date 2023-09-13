using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SupplyChainManagement.Data.Migrations
{
    /// <inheritdoc />
    public partial class undo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_inventory_location_location_id",
                table: "inventory");

            migrationBuilder.DropForeignKey(
                name: "FK_inventory_product_product_id",
                table: "inventory");

            migrationBuilder.DropForeignKey(
                name: "FK_order_product_product_id",
                table: "order");

            migrationBuilder.DropForeignKey(
                name: "FK_shipment_order_order_id",
                table: "shipment");

            migrationBuilder.DropForeignKey(
                name: "FK_shipment_product_product_id",
                table: "shipment");

            migrationBuilder.DropIndex(
                name: "IX_shipment_order_id",
                table: "shipment");

            migrationBuilder.DropIndex(
                name: "IX_shipment_product_id",
                table: "shipment");

            migrationBuilder.DropIndex(
                name: "IX_order_product_id",
                table: "order");

            migrationBuilder.DropIndex(
                name: "IX_inventory_location_id",
                table: "inventory");

            migrationBuilder.DropIndex(
                name: "IX_inventory_product_id",
                table: "inventory");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_shipment_order_id",
                table: "shipment",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_shipment_product_id",
                table: "shipment",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_order_product_id",
                table: "order",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_inventory_location_id",
                table: "inventory",
                column: "location_id");

            migrationBuilder.CreateIndex(
                name: "IX_inventory_product_id",
                table: "inventory",
                column: "product_id");

            migrationBuilder.AddForeignKey(
                name: "FK_inventory_location_location_id",
                table: "inventory",
                column: "location_id",
                principalTable: "location",
                principalColumn: "location_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_inventory_product_product_id",
                table: "inventory",
                column: "product_id",
                principalTable: "product",
                principalColumn: "product_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_order_product_product_id",
                table: "order",
                column: "product_id",
                principalTable: "product",
                principalColumn: "product_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_shipment_order_order_id",
                table: "shipment",
                column: "order_id",
                principalTable: "order",
                principalColumn: "order_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_shipment_product_product_id",
                table: "shipment",
                column: "product_id",
                principalTable: "product",
                principalColumn: "product_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
