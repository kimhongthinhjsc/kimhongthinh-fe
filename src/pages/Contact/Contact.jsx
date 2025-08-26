import "./Contact.scss";
import React from "react";
import { profile } from "~/mock/CompanyProfile.js";

export default function Contact() {
  return (
    <>
      <div className="contact">
        <h1 className="contact__title">LIÊN HỆ</h1>
        <div className="contact__container">
          {/* Cột trái */}
          <div className="contact__left">
            <iframe
              src={profile.googleMapsEmbed}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              lang="vi"
            ></iframe>

            <div className="contact__info">
              <h3>Thông tin liên hệ</h3>
              <p>
                <strong>Hotline:</strong>{" "}
                <a href={`tel:${profile.hotline1}`}>{profile.hotline1}</a> –{" "}
                <a href={`tel:${profile.hotline2}`}>{profile.hotline2}</a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <p>
                <strong>Văn phòng chính:</strong> {profile.addressMain}
              </p>
              <p>
                <strong>Chi nhánh:</strong> {profile.addressBranch}
              </p>
              <p>
                <strong>Sàn thương mại điện tử:</strong>{" "}
                <a
                  href={profile.ecommerce.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {profile.ecommerce.name}
                </a>
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={profile.website.link} target="_blank" rel="noreferrer">
                  {profile.website.name}
                </a>
              </p>
              <p>
                <strong>Fanpage:</strong> {profile.fanpage}
              </p>
              <p>
                <strong>Zalo OA:</strong> {profile.zaloOA}
              </p>
              <p>
                <strong>Youtube:</strong> {profile.youtube}
              </p>
            </div>
          </div>

          {/* Cột phải */}
          <div className="contact__right">
            <div className="contact__banner">
              <p className="contact__note">
                Để lại thông tin, Chúng tôi sẽ liên hệ lại bạn sớm nhất!
              </p>
            </div>

            <form className="contact__form">
              <div className="form-group">
                <label>Tên khách hàng *</label>
                <input
                  type="text"
                  placeholder="Tên công ty/Nếu chưa thành lập thì điền tên dự định đặt"
                  required
                />
              </div>
              <div className="form-group">
                <label>Điện thoại *</label>
                <input type="tel" placeholder="VD: 0123456789" required />
              </div>
              <div className="form-group">
                <label>Người liên hệ chính *</label>
                <input type="text" placeholder="Tên người liên hệ" required />
              </div>
              <div className="form-group">
                <label>Mô tả *</label>
                <textarea placeholder="Dịch vụ cần tư vấn" required></textarea>
              </div>
              <button type="submit" className="btn-submit">
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
