namespace MISA.Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        CustomerID = c.Guid(nullable: false),
                        CustomerName = c.String(),
                        CustomerCode = c.String(),
                        DateOfbirth = c.DateTime(nullable: false),
                        Phone = c.String(),
                        CustomerGroup = c.String(),
                        Note = c.String(),
                        Static = c.String(),
                    })
                .PrimaryKey(t => t.CustomerID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Customers");
        }
    }
}
