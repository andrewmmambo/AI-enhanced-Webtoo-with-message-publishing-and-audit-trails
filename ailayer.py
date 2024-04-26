# Anomaly detection with TensorFlow in Python

import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# create dataset with normal and anomalous data
normal_data = np.random.normal(loc=0, scale=1, size=(1000, 10))
anomalous_data = np.random.normal(loc=10, scale=2, size=(100, 10))
data = np.concatenate([normal_data, anomalous_data], axis=0)
labels = np.concatenate([np.zeros((normal_data.shape[0],)), np.ones((anomalous_data.shape[0],))], axis=0)

# Split dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(data, labels, test_size=0.2, random_state=42)

# Standardize data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Define and train autoencoder model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(X_train_scaled.shape[1],)),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(X_train_scaled.shape[1])
])
model.compile(optimizer='adam', loss='mse')

model.fit(X_train_scaled, X_train_scaled, epochs=10, batch_size=32, validation_data=(X_test_scaled, X_test_scaled))

# Evaluate model on test set
reconstruction_errors = np.mean(np.square(X_test_scaled - model.predict(X_test_scaled)), axis=1)
