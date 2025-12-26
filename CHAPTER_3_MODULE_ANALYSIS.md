# Chapter 3: Detailed Analysis of Functional Modules

Hệ thống Dental Appointment System được chia thành các mô-đun chính, mỗi mô-đun chịu trách nhiệm cho một nhóm chức năng riêng biệt, giúp việc bảo trì và mở rộng dễ dàng hơn. Phân tích chi tiết các mô-đun điển hình:

## 3.1 Authentication Module

Mô-đun này sử dụng Clerk Authentication để thực hiện các chức năng đăng nhập và đăng ký. Clerk hỗ trợ nhiều phương thức xác thực (email/password, Google Sign-In) và tích hợp dễ dàng với Next.js. Mô-đun này chịu trách nhiệm xác thực người dùng, lưu trữ trạng thái đăng nhập, và bảo vệ quyền truy cập vào các chức năng khác của ứng dụng. Middleware được cấu hình để kiểm tra authentication trên tất cả các routes, tự động redirect người dùng chưa đăng nhập đến trang sign-in. Sau khi đăng nhập thành công, hệ thống kiểm tra email của user để xác định vai trò (admin hoặc user thường) và điều hướng đến dashboard tương ứng.

## 3.2 User Management Module

Mô-đun này cho phép đồng bộ thông tin người dùng từ Clerk vào database PostgreSQL. Component UserSync chạy tự động ở background sau khi user đăng nhập, kiểm tra xem user đã tồn tại trong database chưa. Nếu chưa có, hệ thống tự động tạo user mới với thông tin từ Clerk (clerkID, email, firstName, lastName, phone). Mô-đun này đảm bảo mỗi user trong Clerk đều có một bản ghi tương ứng trong database, với clerkID và email là các trường unique. Mô-đun xử lý các trường hợp lỗi một cách graceful, không làm crash ứng dụng khi Clerk API hoặc database gặp sự cố.

## 3.3 Doctor Management Module

Mô-đun này cho phép admin thực hiện CRUD (create, read, update, delete) thông tin bác sĩ. Mỗi bác sĩ có thông tin: name, email, phone, speciality, bio, imageUrl, gender, isActive. Dữ liệu được lưu trữ trong PostgreSQL thông qua Prisma ORM. Mô-đun cung cấp các hàm để lấy danh sách tất cả bác sĩ, lấy danh sách bác sĩ đang active, tạo bác sĩ mới, cập nhật thông tin bác sĩ, và xóa bác sĩ. Khi tạo hoặc cập nhật bác sĩ, hệ thống tự động generate avatar từ tên và giới tính nếu không có imageUrl. Email của bác sĩ phải unique trong hệ thống. Khi xóa bác sĩ, hệ thống tự động xóa các appointments liên quan (cascade delete). Mô-đun này chỉ accessible bởi admin thông qua trang Admin Dashboard.

## 3.4 Appointment Module

Mô-đun trung tâm chịu trách nhiệm tạo, chỉnh sửa, xóa và lưu trữ appointments. Khi tạo appointment mới, hệ thống yêu cầu user chọn bác sĩ, ngày, giờ và loại appointment thông qua quy trình 3 bước: chọn bác sĩ → chọn thời gian → xác nhận. Hệ thống tự động kiểm tra time slot có available không bằng cách query các appointments đã được book trong cùng ngày và cùng bác sĩ với status CONFIRMED hoặc COMPLETED. Sau khi user xác nhận, appointment được tạo với status mặc định là CONFIRMED và duration mặc định là 30 phút. Appointment được lưu vào database với các thông tin: date, time, duration, status, reason, userId, doctorId. Mô-đun cũng cho phép xem lịch sử appointments, cập nhật status (PENDING, CONFIRMED, CANCELLED, COMPLETED), và lấy thống kê appointments của user. User chỉ có thể xem appointments của chính mình, trong khi admin có thể xem tất cả appointments.

## 3.5 Contact/Chat Module

Mô-đun này cho phép user và admin giao tiếp qua hệ thống chat real-time. User có thể mở chatbot button (floating button ở góc dưới bên phải) để gửi tin nhắn hỗ trợ. Khi user gửi tin nhắn đầu tiên, hệ thống tự động tạo một contact mới và liên kết với user đó. Admin có thể xem danh sách tất cả contacts trong trang Admin/Contact, với thông tin về tin nhắn cuối cùng và số lượng tin nhắn. Admin có thể chọn một contact để xem và trả lời tin nhắn. Mô-đun sử dụng Server-Sent Events (SSE) để push tin nhắn mới real-time đến client. Mỗi tin nhắn có thông tin: content, senderId (clerkID), isAdmin flag để phân biệt tin nhắn của admin và user, createdAt. Contact được cập nhật updatedAt mỗi khi có tin nhắn mới để sắp xếp danh sách theo thời gian cập nhật.

## 3.6 Email Notification Module

Mô-đun này chịu trách nhiệm gửi email xác nhận appointment cho user sau khi đặt lịch thành công. Mô-đun sử dụng Resend API và React Email để render email template. Khi appointment được tạo thành công, hệ thống gọi API endpoint /api/send-appointment-email với thông tin: userEmail, doctorName, appointmentDate, appointmentTime, appointmentType, duration, price. Email template được render từ React component AppointmentConfirmationEmail, bao gồm cả HTML và plain text version. Email được gửi với subject "Appointment Confirmation - DentWise" và chứa đầy đủ thông tin về appointment. Mô-đun xử lý các trường hợp lỗi một cách graceful - nếu email gửi thất bại, appointment vẫn được tạo thành công và không hiển thị lỗi cho user (email là optional). Mô-đun hỗ trợ cả test mode và production mode của Resend, với các instructions rõ ràng khi có lỗi.

## 3.7 Voice AI Module

Mô-đun này tích hợp với Vapi AI để cho phép user đặt lịch hẹn thông qua voice conversation. User truy cập trang Voice và sử dụng VapiWidget để bắt đầu cuộc trò chuyện với AI assistant. AI assistant hỏi thông tin về doctor preference, date, time và các thông tin cần thiết khác. User trả lời qua voice, và AI xử lý để tạo appointment. Mô-đun sử dụng Vapi client library (@vapi-ai/web) để khởi tạo voice client với API key từ environment variable. Nếu API key không được cấu hình, mô-đun sử dụng stub client để không làm crash ứng dụng. Mô-đun có thể kiểm tra user có Pro plan không (optional check) và hiển thị ProPlanRequired component nếu user chưa có Pro plan. Voice conversation được xử lý real-time với natural language processing để hiểu ý định của user và tạo appointment phù hợp.

## 3.8 Dashboard Module (Statistics and Reporting)

Mô-đun này hiển thị các metrics tổng hợp và báo cáo cho cả user và admin. Dashboard của user hiển thị: welcome section với tên user, stats cards (total appointments, upcoming, completed, pending), danh sách appointments gần đây với thông tin doctor, ngày giờ, và status. Dashboard của admin hiển thị: welcome section với admin badge, AdminStats (total doctors, active doctors, total appointments, completed appointments), RecentAppointments (tất cả appointments với thông tin patient và doctor), DoctorsManagement section, và ContactList section. Mô-đun sử dụng TanStack Query (React Query) để fetch và cache data, đảm bảo real-time synchronization. Các stats được tính toán từ dữ liệu appointments và doctors trong database. Mô-đun hiển thị loading states và error states một cách graceful, không làm crash ứng dụng khi database gặp sự cố.

## 3.9 Landing Page Module

Mô-đun này hiển thị trang landing page công khai cho visitors chưa đăng nhập. Trang bao gồm các sections: Headers với navigation và sign in/sign up buttons, Hero section với thông tin chính về dịch vụ, HowItWorks section giải thích cách hệ thống hoạt động, WhatToAsk section với các câu hỏi thường gặp, PricingSection hiển thị các plans (Free, AI Basic, AI Pro), CTA section với call-to-action buttons, và Footer với thông tin liên hệ. Mô-đun kiểm tra authentication status - nếu user đã đăng nhập, tự động redirect đến dashboard. Trang được thiết kế responsive cho mọi thiết bị và có smooth scrolling với animations.

## 3.10 Pro/Pricing Module

Mô-đun này hiển thị trang Pro/Pricing để user xem thông tin về các plans và upgrade. Trang hiển thị các plans: Free plan, AI Basic ($9/month), AI Pro ($19/month) với các features tương ứng của mỗi plan. User có thể xem sự khác biệt giữa các plans và quyết định upgrade. Trang chỉ accessible cho user đã đăng nhập. Hiện tại mô-đun chưa implement payment gateway, nhưng đã có cấu trúc sẵn sàng để tích hợp trong tương lai.

Tóm lại, việc chia hệ thống theo các mô-đun chức năng giúp mã nguồn dễ bảo trì và mở rộng hơn. Mỗi mô-đun có phạm vi rõ ràng và độc lập, đáp ứng nguyên tắc separation of concerns của Clean Architecture, và dễ dàng test riêng lẻ.

