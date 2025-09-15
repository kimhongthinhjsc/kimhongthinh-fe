// utils/validatePassword.js
export function validatePassword(oldPassword, newPassword, confirmPassword) {
  if (!oldPassword || !newPassword || !confirmPassword) {
    return "Vui lòng nhập đầy đủ thông tin";
  }

  if (newPassword.length < 6) {
    return "Mật khẩu mới phải có ít nhất 6 ký tự";
  }

  if (newPassword !== confirmPassword) {
    return "Mật khẩu nhập lại không khớp";
  }

  return null; // hợp lệ
}
