-- Chèn dữ liệu giả vào bảng Role
INSERT INTO Roles (role_name ) VALUES
  ('Admin' ),
  ('Editor' ),
  ('User' ),
  ('Guest' );

-- Chèn dữ liệu giả vào bảng Label
INSERT INTO Labels (label_name ) VALUES
  ('Label 1' ),
  ('Label 2' ),
  ('Label 3' );

-- Chèn dữ liệu giả vào bảng Image
INSERT INTO Images (file_path, upload_date, description ) VALUES
  ('/images/image1.jpg', '2023-10-01 12:00:00', 'Description for Image 1' ),
  ('/images/image2.jpg', '2023-10-02 14:30:00', 'Description for Image 2' ),
  ('/images/image3.jpg', '2023-10-03 09:15:00', 'Description for Image 3' );

-- Chèn dữ liệu giả vào bảng User
INSERT INTO Users (username, password, email, role_id ) VALUES
  ('user1', 'password1', 'user1@example.com', 3 ),
  ('user2', 'password2', 'user2@example.com', 3 ),
  ('admin', 'adminpassword', 'admin@example.com', 1 );

-- Chèn dữ liệu giả vào bảng Model
INSERT INTO Models (model_name, path, description, architecture, training_duration, loss, accuracy, user_id ) VALUES
  ('Model 1', '/models/model1', 'Description for Model 1', 'CNN', '02:30:00', 0.05, 95.5, 1 ),
  ('Model 2', '/models/model2', 'Description for Model 2', 'RNN', '03:15:00', 0.08, 92.0, 1 ),
  ('Model 3', '/models/model3', 'Description for Model 3', 'CNN', '02:45:00', 0.07, 93.7, 2 );

-- Chèn dữ liệu giả vào bảng Training
INSERT INTO Trainings (model_id, image_id ) VALUES
  (1, 1 ),
  (1, 2 ),
  (2, 2 ),
  (2, 3 );
