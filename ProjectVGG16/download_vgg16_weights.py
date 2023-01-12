# packages
import tensorflow as tf

# paths
destination_path = "./HomeApp/static/vgg16/"

# get model
vgg16_model = tf.keras.applications.vgg16.VGG16(include_top=True, weights="imagenet", input_tensor=None, input_shape=None, pooling=None, classes=1000, classifier_activation="softmax")

# save model
print("Saving model weights...")
vgg16_model.save(destination_path + "vgg16_weights.h5")
print("Successfully saved model weights")