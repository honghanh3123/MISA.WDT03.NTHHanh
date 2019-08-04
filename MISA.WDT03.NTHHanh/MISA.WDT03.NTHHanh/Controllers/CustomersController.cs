using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MISA.Entities;
using MISA.DL;
using MISA.DL.Dictionary;
using MISA.WDT03.NTHHanh.Properties;

namespace MISA.WDT03.NTHHanh.Controllers
{
    public class CustomersController : ApiController
    {
        private CustomerDL _customerDL = new CustomerDL();

        /// <summary>
        /// Hàm thực hiện lấy dữ liệu khách hàng
        /// Người tạo: Nguyễn Thị Hồng Hạnh
        /// Ngày tạo: 2/8/2019
        /// </summary>
        /// <returns></returns>
        
        [Route("customers")]
        [HttpGet]
        public AjaxResult GetRefs()
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = _customerDL.GetCustomersData();
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Data = ex;
                _ajaxResult.Message = Resources.errorTV;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Hàm thực hiện lấy thông tin khách hàng từ CustomerID
        /// Người tạo: Nguyễn Thị Hồng Hạnh
        /// Ngày tạo: 3/8/2019
        /// </summary>
        /// <param name="_customerID"></param>
        /// <returns></returns>
        [Route("customers/{customerid}")]
        [HttpGet]
        public AjaxResult GetCustomerByCustomerID(Guid _customerID)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = _customerDL.GetCustomerByCustomerID(_customerID);
            }catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Data = ex;
                _ajaxResult.Message = Resources.errorTV;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Hàm thực hiện thêm mới khách hàng
        /// </summary>
        /// <param name="_customeritem"></param>
        /// <returns></returns>
        [Route("customers")]
        [HttpPost]
        public AjaxResult Post([FromBody] Customer _customeritem)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _customerDL.AddCustomer(_customeritem);
            }
            catch(Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Data = ex;
                _ajaxResult.Message = Resources.errorTV;
            }
            _ajaxResult.Data = _customeritem;
            return _ajaxResult;
        }

        /// <summary>
        /// Hàm thực hiện sửa đổi thông tin khách hàng
        /// Người tạo: Nguyễn Thị Hồng Hanh
        /// Ngày tạo: 2/8/2019
        /// </summary>
        /// <param name="_customeritem"></param>
        /// <returns></returns>
        [Route("customers")]
        [HttpPut]
        public AjaxResult Put([FromBody] Customer _customeritem)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _customerDL.UpdateCustomer(_customeritem);
            }catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Data = ex;
                _ajaxResult.Message = Resources.errorTV;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Hàm thực hiện xóa khách hàng
        /// Người tạo: Nguyễn Thị Hồng Hạnh
        /// Ngày tạo: Ngày 2/8/2019
        /// </summary>
        /// <param name="_customerids"></param>
        /// <returns></returns>
        [Route("customers")]
        [HttpDelete]
        public AjaxResult Delete([FromBody] List<Guid> _customerids)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _customerDL.DeleteCustomer(_customerids);
            }catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Data = ex;
                _ajaxResult.Message = Resources.errorTV;
            }
            return _ajaxResult;
        }


    }
}