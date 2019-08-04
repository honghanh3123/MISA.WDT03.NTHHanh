using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public class Customer
    {
        public Guid CustomerID { get; set; }
        public string CustomerName { get; set; }
        public string CustomerCode { get; set; }    
        public DateTime DateOfbirth { get; set; }
        public string Phone { get; set; }
        public string CustomerGroup { get; set; }
        public string Note { get; set; }
        public string Static { get; set; }            
    }
}
