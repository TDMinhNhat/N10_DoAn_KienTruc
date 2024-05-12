import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicSelect from './components/BasicSelect';
import RowRadioButtonsGroup from './components/RowRadioButtonsGroup';
import { Dropdown } from 'react-bootstrap';

const RegisterCoursePage = ({ currentUser }) => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null)
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [radioValue, setRadioValue] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);


    const SelectMonHocChoDangKy = (id) => {
        setSelectedRow(id);
        console.log('check:', id);
    }

    const SelectHocPhanDaDangKy = (id) => {
        console.log('check:', id);
    }

    const XemChiTietLichHoc = (id) => {
        console.log('check:', id);
    }

    const HuyLopHocPhanDangKy = (id) => {
        console.log('check:', id);
    }
    const toggleDropdown = (id) => {
        if (openDropdownId === id) {
            setOpenDropdownId(null); // If the dropdown is open, close it
        } else {
            setOpenDropdownId(id); // If the dropdown is closed, open it
        }
    }
    return (
        <div>
            {currentUser && (
                <div className="container bg-light mt-4 card">
                    <h4>Đăng ký học phần</h4>
                    <div className="border-bottom w-100 my-3"></div>
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <BasicSelect />
                        </div>
                        <div className="col-4">
                            <RowRadioButtonsGroup onValueChange={setRadioValue} />
                        </div>
                    </div>
                    {/* Danh sach dang ky */}
                    <div className="my-4"></div>
                    <h6 className='text-primary'>Môn học/học phần đang chờ đăng ký</h6>
                    <div className="table-responsive">
                        <table className="table-pointer table-custom table table-bordered text-center" width="100%" role="grid" id="dkHocPhan">
                            <thead>
                                <tr role="row">
                                    <td style={{ marginRight: '10px' }}></td>
                                    <th lang="dkhp-stt">STT</th>
                                    <th lang="dkhp-malhp">Mã học phần</th>
                                    <th lang="dkhp-tenmh">Tên môn học/học phần</th>
                                    <th lang="dkhp-tc">TC</th>
                                    <th lang="dkhp-batbuoc">Bắt buộc</th>
                                    <th lang="dkhp-hoctruoctienquyetsonghanh">
                                        học phần: học trước (a),
                                        <br />
                                        tiên quyết (b),
                                        <br />
                                        song hành (c)
                                    </th>
                                    {radioValue === 'hoc cai thien' && <th>Học Lại</th>} {/* Conditional rendering of the column */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr onClick={() => SelectMonHocChoDangKy("3193")} data-id="3193" data-mamh="003193" data-mahpduochoc="4203003193">
                                    <td className="text-center">
                                        <div>
                                            <label className="mt-radio" style={{ paddingLeft: '17px' }}>
                                                <input id="rdoMonHocChoDangKy" name="rdoMonHocChoDangKy" type="radio" value="3193" checked={selectedRow === "3193"} readOnly />
                                                <span></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>1</td>
                                    <td>4203003193</td>
                                    <td className="text-left">Toán ứng dụng</td>
                                    <td>
                                        3
                                    </td>
                                    <td>
                                        <div>
                                            <div className="no-check"></div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr onClick={() => SelectMonHocChoDangKy("3240")} data-id="3240" data-mamh="003240" data-mahpduochoc="4203003240">
                                    <td className="text-center">
                                        <div>
                                            <label className="mt-radio" style={{ paddingLeft: '17px' }}>
                                                <input id="rdoMonHocChoDangKy" name="rdoMonHocChoDangKy" type="radio" value="3240" checked={selectedRow === "3240"} readOnly />
                                                <span></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>2</td>
                                    <td>4203003240</td>
                                    <td className="text-left">Hàm phức và phép biến đổi Laplace</td>
                                    <td>
                                        3
                                    </td>
                                    <td>
                                        <div>
                                            <div className="no-check"></div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr onClick={() => SelectMonHocChoDangKy("3320")} data-id="3320" data-mamh="003320" data-mahpduochoc="4203003320">
                                    <td className="text-center">
                                        <div>
                                            <label className="mt-radio" style={{ paddingLeft: '17px' }}>
                                                <input id="rdoMonHocChoDangKy" name="rdoMonHocChoDangKy" type="radio" value="3320" checked={selectedRow === "3320"} readOnly />
                                                <span></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>3</td>
                                    <td>4203003320</td>
                                    <td className="text-left">Phương pháp tính</td>
                                    <td>
                                        3
                                    </td>
                                    <td>
                                        <div>
                                            <div className="no-check"></div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr onClick={() => SelectMonHocChoDangKy("3395")} data-id="3395" data-mamh="003395" data-mahpduochoc="4203003395">
                                    <td className="text-center">
                                        <div>
                                            <label className="mt-radio" style={{ paddingLeft: '17px' }}>
                                                <input id="rdoMonHocChoDangKy" name="rdoMonHocChoDangKy" type="radio" value="3395" checked={selectedRow === "3395"} readOnly />
                                                <span></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>4</td>
                                    <td>4203003395</td>
                                    <td className="text-left">Logic học</td>
                                    <td>
                                        3
                                    </td>
                                    <td>
                                        <div>
                                            <div className="no-check"></div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr onClick={() => SelectMonHocChoDangKy("3196")} data-id="3196" data-mamh="003196" data-mahpduochoc="4203003196">
                                    <td className="text-center">
                                        <div>
                                            <label className="mt-radio" style={{ paddingLeft: '17px' }}>
                                                <input id="rdoMonHocChoDangKy" name="rdoMonHocChoDangKy" type="radio" value="3196" checked={selectedRow === "3196"} readOnly />
                                                <span></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>5</td>
                                    <td>4203003196</td>
                                    <td className="text-left">Giao tiếp kinh doanh</td>
                                    <td>
                                        3
                                    </td>
                                    <td>
                                        <div>
                                            <div className="no-check"></div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr onClick={() => SelectMonHocChoDangKy("3206")} data-id="3206" data-mamh="003206" data-mahpduochoc="4203003206">
                                    <td className="text-center">
                                        <div>
                                            <label className="mt-radio" style={{ paddingLeft: '17px' }}>
                                                <input id="rdoMonHocChoDangKy" name="rdoMonHocChoDangKy" type="radio" value="3206" checked={selectedRow === "3206"} readOnly />
                                                <span></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>6</td>
                                    <td>4203003206</td>
                                    <td className="text-left">Môi trường và con người</td>
                                    <td>
                                        3
                                    </td>
                                    <td>
                                        <div>
                                            <div className="no-check"></div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr onClick={() => SelectMonHocChoDangKy("3217")} data-id="3217" data-mamh="003217" data-mahpduochoc="4203003217">
                                    <td className="text-center">
                                        <div>
                                            <label className="mt-radio" style={{ paddingLeft: '17px' }}>
                                                <input id="rdoMonHocChoDangKy" name="rdoMonHocChoDangKy" type="radio" value="3217" checked={selectedRow === "3217"} readOnly />
                                                <span></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>7</td>
                                    <td>4203003217</td>
                                    <td className="text-left">Quản trị học</td>
                                    <td>
                                        3
                                    </td>
                                    <td>
                                        <div>
                                            <div className="no-check"></div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Mon hoc cho dang ky */}
                    <div className="row mt-4" id="lopHPChoDangKy">
                        <div className="col-md-6">
                            <div className="gr-table">
                                <div className="border-scroll overflow-auto outline-none" style={{ maxHeight: '570px' }} tabindex="1">                                    <div id="box_lophocphan_chodangky">
                                    <h3 className="title-table" lang="lhpchodangky-tabletitle">Lớp học phần chờ đăng ký</h3>
                                    <div className="text-right mb-4 mt-4">
                                        <label>
                                            <input id="checkLichTrung" name="checkLichTrung" type="checkbox" value="true" />
                                            <input name="checkLichTrung" type="hidden" value="false" />
                                            <b>
                                                <span className="text-uppercase text-danger ms-2 me-3" lang="lhpchodangky-lhpkhongtrunglich">HIỂN THỊ LỚP học phần KHÔNG TRÙNG LỊCH</span>
                                            </b>
                                        </label>
                                    </div>
                                    <div className="table-responsive">
                                        <table id="table_lhpchodangky" className="table-pointer table-dkhp table-custom table table-bordered text-center no-footer dtr-inline" width="100%" role="grid">
                                            <thead>
                                                <tr role="row">
                                                    <th lang="sv-stt">STT</th>
                                                    <th lang="dkhp-thongtinlhp">Thông tin lớp học phần</th>
                                                    <th lang="dkhp-dadangky">Đã đăng ký</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="tr-active" onClick="SelectLopHocPhanChoDangKy(this)" data-guidlhp="A_z8XtjSSV6iX-VEW36Nuw">
                                                    <td style={{ width: '40px' }}>1</td>
                                                    <td className="text-left">
                                                        <div className="name">Automat &amp; ngôn ngữ hình thức</div>
                                                        <div>
                                                            <span lang="dkhp-trangthai">Trạng thái</span>: <span className="cl-red">Đã khóa </span>
                                                            <span lang="dkhp-malhp">Mã lớp  học phần</span>: 420300136601 - DHCNTT16A
                                                        </div>
                                                    </td>
                                                    <td>72 / 85</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="gr-table">
                                <div className="border-scroll" tabindex="2" style={{ overflow: 'hidden', outline: 'none' }}>
                                    <div id="box_chitietlophocphan_chodangky">
                                        <h3 className="title-table" lang="ctlhpchodangky-tabletitle">Chi tiết lớp học phần</h3>
                                        <div className="text-right" style={{ marginBottom: '5px' }}>
                                            <button onClick="XemLichTrung(this)" className="btn btn--m block first" style={{ backgroundColor: '#ec9e0f', color: '#fff' }} lang="dkhp-xemlichtrungButton">Xem lịch trùng</button>
                                        </div>
                                        <table id="tbChiTietDKHP" className="table table-bordered text-center" role="grid">
                                            <thead>
                                                <tr role="row">
                                                    <th>
                                                        <p><span lang="dkhp-trangthai">Trạng thái</span>: <span className="red-bold">Đã khóa</span></p>
                                                    </th>
                                                    <th>
                                                        <div>
                                                            <span><span lang="dkhp-sisomax">Sĩ số tối đa</span>: 85</span>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="tr-active tr-chitietlichdangky" onclick="SelectChiTietLopHocPhan(this)" data-guididdk="A_z8XtjSSV6iX-VEW36Nuw" data-nhomth="" data-chonnhom="false">
                                                    <td className="text-left">
                                                        <div><span lang="dkhp-lichhoc">Lịch học</span>: <b>LT   - Thứ 4  (Tiết 1  -&gt; 3 )</b></div>
                                                        <p><span lang="dkhp-phong">Phòng</span>: <b>X13.05</b></p>
                                                    </td>
                                                    <td className="text-left">
                                                        <div className="name"><span lang="dkhp-gv">GV</span>: ThS Nguyễn Thị Thanh Bình</div>
                                                        27/12/2023 - 24/04/2024
                                                    </td>
                                                </tr>
                                                <tr className="tr-active tr-chitietlichdangky" onclick="SelectChiTietLopHocPhan(this)" data-guididdk="A_z8XtjSSV6iX-VEW36Nuw" data-nhomth="" data-chonnhom="false">
                                                    <td className="text-left">
                                                        <div><span lang="dkhp-lichhoc">Lịch học</span>: <b>LT   - Thứ 4  (Tiết 1  -&gt; 3 )</b></div>
                                                        <p><span lang="dkhp-phong">Phòng</span>: <b>Trực tuyến 115</b></p>
                                                    </td>
                                                    <td className="text-left">
                                                        <div className="name"><span lang="dkhp-gv">GV</span>: ThS Nguyễn Thị Thanh Bình</div>
                                                        20/03/2024 - 03/04/2024
                                                    </td>
                                                </tr>
                                                <tr className="tr-active tr-chitietlichdangky" onclick="SelectChiTietLopHocPhan(this)" data-guididdk="A_z8XtjSSV6iX-VEW36Nuw" data-nhomth="" data-chonnhom="false">
                                                    <td className="text-left">
                                                        <div><span lang="dkhp-lichhoc">Lịch học</span>: <b>LT   - Thứ 4  (Tiết 1  -&gt; 3 )</b></div>
                                                        <p><span lang="dkhp-phong">Phòng</span>: <b>Trực tuyến 172</b></p>
                                                    </td>
                                                    <td className="text-left">
                                                        <div className="name"><span lang="dkhp-gv">GV</span>: ThS Nguyễn Thị Thanh Bình</div>
                                                        21/02/2024 - 21/02/2024
                                                    </td>
                                                </tr>
                                                <tr className="tr-active tr-chitietlichdangky" onclick="SelectChiTietLopHocPhan(this)" data-guididdk="A_z8XtjSSV6iX-VEW36Nuw" data-nhomth="" data-chonnhom="false">
                                                    <td className="text-left">
                                                        <div><span lang="dkhp-lichhoc">Lịch học</span>: <b>LT   - Thứ 6  (Tiết 7  -&gt; 9 )</b></div>
                                                        <p><span lang="dkhp-phong">Phòng</span>: <b>X13.06</b></p>
                                                    </td>
                                                    <td className="text-left">
                                                        <div className="name"><span lang="dkhp-gv">GV</span>: ThS Nguyễn Thị Thanh Bình</div>
                                                        03/05/2024 - 03/05/2024
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="text-center has-2btn">
                                            <button onclick="DangKyHocPhan(this)" className="btn btn--m block first" style={{ backgroundColor: '#0190F3', color: '#fff', width: 100 }} lang="dkhp-dangkyButton">Đăng ký</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hoc phan da dang ky */}
                    <div className='my-4'></div>
                    <h6 className='text-primary'>Lớp HP đã đăng ký trong học kỳ này</h6>
                    <div className="table-responsive">
                        <table className="table-pointer table-custom table table-bordered text-center" width="100%" role="grid" id="dkHocPhan">
                            <thead>
                                <tr role="row">
                                    <th lang="dangkyhocphan-thaotac">Thao tác</th>
                                    <th lang="dangkyhocphan-stt">STT</th>
                                    <th lang="dangkyhocphan-dadangkymalhp">Mã lớp  HP</th>
                                    <th lang="dangkyhocphan-tenmh">Tên môn học/HP</th>
                                    <th lang="dangkyhocphan-dadangkylopdukien">Lớp học dự kiến</th>
                                    <th lang="dangkyhocphan-tc">TC</th>
                                    <th lang="dangkyhocphan-nhomth">Nhóm TH</th>
                                    <th lang="dangkyhocphan-trangthaidangky">Trạng thái ĐK</th>
                                    <th lang="dangkyhocphan-ngaydangky">Ngày ĐK</th>
                                    <th lang="dangkyhocphan-trangthailhp">TT lớp HP </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr onClick={() => SelectHocPhanDaDangKy(this)}>
                                    <td>
                                        <button className="btn btn-primary w-full text-nowrap" onClick={(e) => { e.stopPropagation(); XemChiTietLichHoc(this, 'EHbuRMwZbLq-wqeg2E8Akg', 3) }}>Xem lịch</button>
                                    </td>
                                    <td>1</td>
                                    <td>420300154901</td>
                                    <td className="text-left">Kiến trúc và Thiết kế phần mềm</td>
                                    <td>DHKTPM16A</td>
                                    <td>4</td>
                                    <td>3</td>
                                    <td>Đăng ký mới</td>
                                    <td>14/11/2023</td>
                                    <td>Đã khóa</td>
                                </tr>
                                <tr onClick={() => SelectHocPhanDaDangKy(this)}>
                                    <td>
                                        <button className="btn btn-primary w-full text-nowrap" onClick={(e) => { e.stopPropagation(); XemChiTietLichHoc(this, 'HtfPo6KFwpTbEWELq-gWlA', 1) }} data-idlhpdk="8668950" data-guid="YhEVHnGDpbJCynKFAjMk2g" lang="dangkyhocphan-xem-button">Xem lịch</button>
                                    </td>
                                    <td>2</td>
                                    <td>420300214605</td>
                                    <td className="text-left">Lập trình phân tán với công nghệ Java</td>
                                    <td>DHKTPM17A</td>
                                    <td>3</td>
                                    <td>1</td>
                                    <td>Đăng ký mới</td>
                                    <td>14/11/2023</td>
                                    <td>Đã khóa</td>
                                </tr>
                                <tr onClick={() => SelectHocPhanDaDangKy(this)}>
                                    <td>
                                        <button className="btn btn-primary w-full text-nowrap" onClick={(e) => { e.stopPropagation(); XemChiTietLichHoc(this, 'K-16G7f-0qPI93MRzeEPBQ', 3) }} data-idlhpdk="8690765" data-guid="wKvXJ-3pUtny60yo0xgQ7g" lang="dangkyhocphan-xem-button">Xem lịch</button>
                                    </td>
                                    <td>3</td>
                                    <td>420300232902</td>
                                    <td className="text-left">Nhập môn dữ liệu lớn</td>
                                    <td>DHHTTT16B</td>
                                    <td>3</td>
                                    <td>1</td>
                                    <td>Đăng ký mới</td>
                                    <td>17/11/2023</td>
                                    <td>Đã khóa</td>
                                </tr>
                                <tr onClick={() => SelectHocPhanDaDangKy(this)}>
                                    <td>
                                        <button className="btn btn-primary w-full text-nowrap" onClick={(e) => { e.stopPropagation(); XemChiTietLichHoc(this, 'mKojxuIkHMZpIR2kb-Ra3A', 2) }} data-idlhpdk="8668938" data-guid="gNJjaPSJqDkjj4B_9q-3eQ" lang="dangkyhocphan-xem-button">Xem lịch</button>
                                    </td>
                                    <td>4</td>
                                    <td>420300405602</td>
                                    <td className="text-left">Quản lý dự án CNTT</td>
                                    <td>DHKTPM16B</td>
                                    <td>3</td>
                                    <td>2</td>
                                    <td>Đăng ký mới</td>
                                    <td>14/11/2023</td>
                                    <td>Đã khóa</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            )
            }
        </div >
    )
}

export default RegisterCoursePage