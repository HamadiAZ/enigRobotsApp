import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { Card, Icon } from "react-native-elements";

export function ImageGallery() {
  const images = [
    {
      image: require(`../assets/images/homeGallery/1.png`),
    },
    {
      image: require(`../assets/images/homeGallery/2.jpg`),
    },
    {
      image: require(`../assets/images/homeGallery/3.jpg`),
    },
    {
      image: require(`../assets/images/homeGallery/4.jpg`),
    },
    {
      image: require(`../assets/images/homeGallery/5.jpg`),
    },
    {
      image: require(`../assets/images/homeGallery/6.jpg`),
    },
    {
      image: require(`../assets/images/homeGallery/7.jpg`),
    },
    {
      image: require(`../assets/images/homeGallery/8.jpg`),
    },
    {
      image: require(`../assets/images/homeGallery/9.jpg`),
    },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {images.map((image, index) => (
        <Card key={index} containerStyle={styles.cardContainer}>
          <Image source={image.image} style={styles.cardImage} resizeMode="cover" />
        </Card>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    width: 330,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    padding: 0,
  },
  cardImage: {
    height: 230,
    padding: 0,
    margin: 0,
  },
});
