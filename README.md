# Cách sử dụng

Hầu hết các công cụ để cài đặt và chạy MongoDB đều bắt đầu một máy chủ độc lập chứ không phải một tập hợp bản sao (replica set). Nếu bạn cố gắng bắt đầu một phiên trên một máy chủ độc lập, bạn sẽ gặp lỗi này.

Để sử dụng các giao dịch, bạn cần một bộ bản sao MongoDB và bắt đầu một bộ bản sao cục bộ để phát triển là một quá trình liên quan. Cái mới ```run-rs npm module``` làm cho việc bắt đầu các bộ bản sao trở nên dễ dàng. Chạy run-rs là tất cả những gì bạn cần để bắt đầu một tập hợp bản sao, run-rs thậm chí sẽ cài đặt đúng phiên bản MongoDB cho bạn.

Cài đặt ```run-rs``` trên toàn cầu với ```npm's -g```. Bạn cũng có thể liệt kê các run-rs trong ```package.json``` devDependencies của tệp.
```
npm install run-rs -g
```

Tiếp theo, chạy run-rs với cờ --version. Run-rs sẽ tải xuống MongoDB v4.0.0 cho bạn. Đừng lo lắng, nó sẽ không ghi đè cài đặt MongoDB hiện có của bạn.
```
run-rs -v 4.0.0 --shell
```
Sau đó, sử dụng ```replicaSet=rs``` trong chuỗi kết nối của bạn.

