using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Dictionary
{
    public class CustomerDL
    {
        private MISAWDT03NTHHanhContext db = new MISAWDT03NTHHanhContext();

        /// <summary>
        /// Hàm thực hiện lấy dữ liệu từ phiếu thu
        /// Người tạo: Nguyễn Thị Hồng Hạnh
        /// Ngày tạo: Ngày 2/8/2019
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Customer> GetCustomersData()
        {
            return db.Customers;
        }

        /// <summary>
        /// Hàm thực hiện thêm mới dữ liệu 
        /// Người tạo: Nguyễn Thị Hồng Hạnh
        /// Ngày tạo: 2/8/2019
        /// </summary>
        /// <param name="_customer"></param>
        public void AddCustomer (Customer _customer)
        {
            _customer.CustomerID = Guid.NewGuid();
            db.Customers.Add(_customer);
            db.SaveChanges();
        }

        /// <summary>
        /// Hàm thực hiện sửa dữ liệu khách hàng
        /// Người tạo: Nguyễn Thị Hồng Hạnh
        /// Ngày tạo: Ngày 2/8/2019
        /// </summary>
        /// <param name="_customer"></param>
        public void UpdateCustomer (Customer _customer)
        {
            var _customerFind = db.Customers.Where(p => p.CustomerID == _customer.CustomerID).FirstOrDefault();
            if(_customerFind != null)
            {
                _customerFind.CustomerName = _customer.CustomerName;
                _customerFind.CustomerCode = _customer.CustomerCode;
                _customerFind.CustomerGroup = _customer.CustomerGroup;
                _customerFind.Static = _customer.Static;
                _customerFind.DateOfbirth = _customer.DateOfbirth;
                _customer.Phone = _customer.Phone;
                _customerFind.Note = _customer.Note;
            }
            db.SaveChanges();
        }

        /// <summary>
        /// Hàm thực hiện xóa khách hàng
        /// Người tạo: Nguyễn Thị Hồng Hạnh
        /// Ngày tạo: Ngày 2/8/2019
        /// </summary>
        /// <param name="_customerids"></param>
        public void DeleteCustomer(List<Guid> _customerids)
        {
            foreach(var _customerid in _customerids)
            {
                var customerItem = db.Customers.Where(p => p.CustomerID == _customerid).FirstOrDefault();
                db.Customers.Remove(customerItem);            
            }
            db.SaveChanges();
        }

        /// <summary>
        /// Hàm thực hiện lấy thông tin khách hàng từ CustomerID
        /// Người tạo: Nguyễn Thị Hồng Hạnh
        /// Ngày tạo: 2/8/2019
        /// </summary>
        /// <param name="_customerID"></param>
        /// <returns></returns>
        public Customer GetCustomerByCustomerID(Guid _customerID)
        {
            var customerItem = db.Customers.Where(p => p.CustomerID == _customerID).FirstOrDefault();
            return customerItem;
        }
    }
}
