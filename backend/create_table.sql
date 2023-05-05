CREATE TABLE history (
  id INT(11) NOT NULL AUTO_INCREMENT,
  lat FLOAT(10, 6) NOT NULL,
  lng FLOAT(10, 6) NOT NULL,
  radius INT(11) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO history (lat, lng, radius) VALUES
  (35.681167, 139.767052, 500),
  (35.6585805, 139.7454329, 1000),
  (35.6443885, 139.6999402, 2000);