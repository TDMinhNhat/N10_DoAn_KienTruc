import React, { useRef, useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import * as fontkit from 'fontkit';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import filePDF from '../../asset/file.pdf';
import robotoFont from '../../asset/Roboto/Roboto-Regular.ttf';

function GraduationForm() {
    const [pdfBytes, setPdfBytes] = useState(null);
    const formRef = useRef();

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const existingPdfBytes = await fetch(filePDF).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        pdfDoc.registerFontkit(fontkit);

        const fontBytes = await fetch(robotoFont).then((res) => res.arrayBuffer());
        const customFont = await pdfDoc.embedFont(fontBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        const formData = new FormData(formRef.current);
        const formValues = Object.fromEntries(formData.entries());

        const lineHeight = 15;
        const maxLineLength = 55;

        const drawText = (text, x, y, size = 10) => {
            firstPage.drawText(text, {
                x,
                y,
                size,
                font: customFont,
                color: rgb(0, 0, 0)
            });
        };

        drawText(formValues.dvdt, 290, height - 197);
        drawText(formValues.hoten, 163, height - 240);
        drawText(formValues.mssv, 440, height - 240);

        // Format ngaysinh
        const formattedNgaySinh = formatDate(formValues.ngaysinh);
        drawText(formattedNgaySinh, 180, height - 253);

        drawText(formValues.noisinh, 170, height - 268);
        drawText(formValues.dienthoai, 175, height - 309);
        drawText(formValues.lop, 220, height - 323);
        drawText(formValues.he, 410, height - 323);
        drawText(formValues.nganh, 160, height - 337);
        drawText(formValues.khoa, 440, height - 337);

        const addressX = 120;
        const addressY = height - 281;
        const initialX = 220;
        const addressLines = formValues.diachi.match(new RegExp('.{1,' + maxLineLength + '}', 'g'));
        addressLines.forEach((line, index) => {
            const x = index === 0 ? initialX : addressX;
            drawText(line, x, addressY - (lineHeight * index));
        });

        const [day, month, year] = formValues.ngaylamdon.split('-');

        drawText(day, 536, height - 388);
        drawText(month, 490, height - 388);
        drawText(year, 430, height - 388);

        const pdfBytes = await pdfDoc.save();
        setPdfBytes(pdfBytes);
    };

    const handlePrint = () => {
        if (pdfBytes) {
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const newWindow = window.open(url, '_blank');
            if (newWindow) {
                newWindow.addEventListener('load', () => {
                    newWindow.print();
                });
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="card bg-light text-black p-4">
                <h2>ĐƠN XIN XÉT TỐT NGHIỆP</h2>
                <p>(Dành cho sinh viên học theo học chế tín chỉ)</p>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">ĐVĐT:</label>
                        <div className="col-sm-4">
                            <input name="dvdt" type="text" className="form-control" placeholder="ĐVĐT" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Họ tên:</label>
                        <div className="col-sm-4">
                            <input name="hoten" type="text" className="form-control" placeholder="Họ tên" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">MSSV:</label>
                        <div className="col-sm-4">
                            <input name="mssv" type="text" className="form-control" placeholder="MSSV" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Ngày sinh:</label>
                        <div className="col-sm-2">
                            <input name="ngaysinh" type="date" className="form-control" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Nơi sinh:</label>
                        <div className="col-sm-2">
                            <input name="noisinh" type="text" className="form-control" placeholder="Nơi sinh" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Địa chỉ thường trú:</label>
                        <div className="col-sm-4">
                            <textarea name="diachi" className="form-control" rows="3" placeholder="Địa chỉ thường trú" required></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Điện thoại:</label>
                        <div className="col-sm-4">
                            <input name="dienthoai" type="text" className="form-control" placeholder="Điện thoại" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Tên lớp sinh viên:</label>
                        <div className="col-sm-4">
                            <input name="lop" type="text" className="form-control" placeholder="Tên lớp sinh viên" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Hệ:</label>
                        <div className="col-sm-4">
                            <input name="he" type="text" className="form-control" placeholder="Hệ" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Ngành:</label>
                        <div className="col-sm-4">
                            <input name="nganh" type="text" className="form-control" placeholder="Ngành" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Khóa:</label>
                        <div className="col-sm-4">
                            <input name="khoa" type="text" className="form-control" placeholder="Khóa" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Ngày làm đơn:</label>
                        <div className="col-sm-2">
                            <input name="ngaylamdon" type="date" className="form-control" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10 offset-sm-2">
                            <button type="submit" className="btn btn-primary mt-3">Điền vào file PDF</button>
                        </div>
                    </div>
                </form>

                {pdfBytes && (
                    <div className="mt-5">
                        <h3>File PDF đã điền thông tin:</h3>
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={URL.createObjectURL(new Blob([pdfBytes]))} />
                        </Worker>
                        <button className="btn btn-secondary mt-3" onClick={handlePrint}>In file PDF</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GraduationForm;
