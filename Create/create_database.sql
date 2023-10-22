CREATE TABLE Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);
CREATE TABLE Labels (
    label_id INT AUTO_INCREMENT PRIMARY KEY,
    label_name VARCHAR(50) NOT NULL
);

CREATE TABLE Images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    file_path VARCHAR(255) NOT NULL,
    upload_date DATETIME NOT NULL,
    description TEXT,
    user_id INT,
    label_id INT,
    FOREIGN KEY (label_id) REFERENCES Labels(label_id)
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, -- Đã thêm UNIQUE constraint
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE, -- Đã thêm UNIQUE constraint
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

CREATE TABLE Models (
    model_id INT AUTO_INCREMENT PRIMARY KEY,
    model_name VARCHAR(255) NOT NULL,
    description TEXT,
    architecture VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Training (
    training_id INT AUTO_INCREMENT PRIMARY KEY,
    model_id INT,
    image_id INT,
    training_date DATETIME NOT NULL,
    training_duration TIME,
    loss FLOAT,
    accuracy FLOAT,
    FOREIGN KEY (model_id) REFERENCES Models(model_id),
    FOREIGN KEY (image_id) REFERENCES Images(image_id)
);

