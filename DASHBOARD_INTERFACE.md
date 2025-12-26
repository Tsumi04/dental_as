# User Dashboard và Admin Dashboard Interface

## User Dashboard

Giao diện dashboard của user bao gồm:

**Welcome Section**: Panel gradient với badge "Dashboard" và lời chào cá nhân "Welcome back, [Tên]!" cùng mô tả về quản lý appointments. Icon Calendar lớn ở bên phải.

**Statistics Cards**: 4 cards hiển thị metrics: Total Appointments (tổng số), Upcoming (màu xanh dương), Completed (màu xanh lá), Pending (màu cam) với icons và số liệu real-time.

**Appointments List**: Card hiển thị danh sách 5 appointments gần nhất với thông tin doctor (avatar, tên, chuyên khoa), ngày giờ, và status badges (color-coded: xanh lá cho COMPLETED, xanh dương cho CONFIRMED, cam cho PENDING, đỏ cho CANCELLED). Empty state hiển thị khi chưa có appointments.

## Admin Dashboard

Giao diện dashboard của admin bao gồm:

**Welcome Section**: Panel gradient tương tự với badge "Admin Dashboard", lời chào "Welcome back, [Tên]!" và mô tả về quản lý practice. Icon Settings lớn ở bên phải.

**Admin Statistics**: 4 cards metrics: Total Doctors, Active Doctors (màu xanh lá), Total Appointments, Completed Appointments (màu tím) với icons và background colors tương ứng.

**Recent Appointments Table**: Bảng hiển thị tất cả appointments với columns: Patient (tên và email), Doctor, Date & Time, Reason, Status (clickable badge để toggle status), và Actions. Status có thể click để chuyển đổi giữa PENDING → CONFIRMED → COMPLETED → CANCELLED.

**Doctors Management**: Section quản lý bác sĩ với CRUD operations (Add, Edit, Delete) và danh sách doctors với thông tin chi tiết.

**Contact List**: Danh sách contacts từ users với latest message preview, message count, và thời gian cập nhật. Click vào contact mở ChatDialog để trả lời tin nhắn.

Cả hai dashboard sử dụng card-based layout với gradient backgrounds, color-coded status indicators, và responsive grid system. Dark mode theme với terracotta orange accents tạo giao diện chuyên nghiệp và dễ sử dụng.

