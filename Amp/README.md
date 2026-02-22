# Cách lấy System Prompt cho [Amp](https://ampcode.com)

1. Đăng nhập với Amp sử dụng VScode
2. Nhập một truy vấn ngắn vào Amp
3. Giữ Alt (windows) hoặc Option (macOS) và nhấp vào nút workspace

![](./view-thread-yaml.png)

4. Nhấp vào xem Thread YAML

# Ghi chú

System prompt được sử dụng bởi Amp được điều chỉnh cho Sonnet 4.x và có các LLM khác được đăng ký vào nó như công cụ ("the oracle"). Để lấy system prompt điều chỉnh `GPT-5` thì bạn cần cấu hình cài đặt người dùng VSCode với các sau và sau đó làm theo các bước trên lại

```json
{
    "amp.url": "https://ampcode.com/",
    "amp.gpt5": true
}
```
