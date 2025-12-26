# Application Welcome & Authentication

## Welcome Screen Interface

Ứng dụng DentWise mở với màn hình welcome chuyên nghiệp thiết lập bản sắc thương hiệu:

**Authentication Interface**: Giao diện xác thực được tích hợp qua Clerk Authentication với:
- **Sign In/Sign Up Buttons**: Hai nút trong header navigation - "Login" (ghost variant) và "Sign Up" (primary variant với màu orange) sử dụng Clerk's SignInButton và SignUpButton components với mode="modal" để hiển thị authentication modal overlay
- **Alternative Authentication**: Clerk hỗ trợ nhiều phương thức đăng nhập (Email/Password, Google Sign-In) được cấu hình trong ClerkProvider với appearance customization (colorPrimary: #2563eb, colorBackground: #ffffff)
- **CTA Buttons**: Hero section có hai call-to-action buttons chính - "Try voice agent" (primary button với Mic icon) và "Book appointment" (outline variant với Calendar icon), cả hai đều trigger SignUpButton modal

**Design Elements**: 
- **Background**: Gradient background phức tạp với multiple layers - gradient từ background qua muted/5 đến primary/5, grid pattern overlay với opacity 20%, và gradient orbs (blur-3xl) tạo depth và visual interest
- **Color Palette**: Sử dụng terracotta orange (#d87943) làm primary color, teal (#527575) làm secondary, trên dark background tạo contrast và warmth
- **Visual Effects**: Subtle geometric patterns (linear-gradient grid), floating gradient orbs với blur effects, và radial gradients tạo không gian 3D
- **Social Proof**: Hiển thị 5 user avatars với ring-4 styling, star rating 4.9/5 với primary color, và text "Trusted by 1,200+ patients" để xây dựng trust

**Navigation Bar**: Fixed header với backdrop-blur-md effect, border-bottom với opacity 50%, chứa logo, navigation links (How it Works, Pricing, About - ẩn trên mobile với hidden md:flex), và authentication buttons. Navigation sử dụng hover effects với transition-colors và active states được highlight.

Giao diện duy trì aesthetic chuyên nghiệp phù hợp cho người dùng y tế trong khi vẫn thân thiện và dễ sử dụng, với focus vào trust và accessibility thông qua clear visual hierarchy và intuitive navigation flow.

