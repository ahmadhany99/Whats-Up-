/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import { EvilIcons } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import AppModal from "../components/AppModal";
import TitleHeaders from "../components/TitleHeaders";
import UtilBtn from "../components/UtilBtn";
import Art from "../assets/CoverImages/Art.jpg";
import Auditorium from "../assets/CoverImages/Auditorium.jpg";
import Concordia from "../assets/CoverImages/Concordia.jpg";
import Frosh from "../assets/CoverImages/Frosh.jpg";
import Graduation from "../assets/CoverImages/Graduation.jpg";
import McGill from "../assets/CoverImages/McGill.jpeg";
import Park from "../assets/CoverImages/Park.jpg";
import Sports from "../assets/CoverImages/Sports.jpg";
import Studying from "../assets/CoverImages/Studying.jpg";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "expo-storage";

function OrganizerNewEvent() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageName, setCoverImageName] = useState("");
  const [imageSelected, setImageSelected] = useState("");

  const handleAddingEvent = async (
    eventName,
    orgName,
    location,
    description,
    coverImageName
  ) => {
    if (eventName.length == 0) {
      Alert.alert("Error", "Please fill out the title.");
      return;
    }
    if (orgName.length == 0) {
      Alert.alert("Error", "Please fill out the organization name.");
      return;
    }
    if (location.length == 0) {
      Alert.alert("Error", "Please fill out the location.");
      return;
    }
    if (description.length == 0) {
      Alert.alert("Error", "Please fill out the description.");
      return;
    }
    if (coverImageName.length == 0) {
      Alert.alert("Error", "Please select a cover image.");
      return;
    }

    const newEvent = {
      eventName: eventName,
      orgName: orgName,
      location: location,
      description: description,
      link: link,
      coverImage: coverImageName,
    };

    //If every mandatory fields is filled out, store the information and go to next page
    storeNewEvent(newEvent);
    navigation.navigate("POC");
  };

  const storeNewEvent = async (newEvent) => {
    try {
      const jsonValue = JSON.stringify(newEvent);
      await Storage.setItem({
        key: "newEvent",
        value: jsonValue,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCoverImage = async (coverImage, coverImageName) => {
    setCoverImage(coverImage);
    setCoverImageName(coverImageName);
    setImageSelected(coverImageName);
  };

  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <UtilBtn
          icon="chevron-back-outline"
          style={{ position: "absolute", left: 0 }}
          onPress={() => navigation.navigate("Organizer")}
        />
        <TitleHeaders
          style={{ alignSelf: "center" }}
          title={"Create New Event"}
        />
      </View>
      <View style={{ width: "100%", display: "flex" }}>
        <TitleHeaders
          style={{ alignSelf: "center" }}
          isTitle={false}
          title="Please fill the following information"
        />
      </View>
      <ScrollView style={{ paddingTop: 20 }}>
        <View>
          <AppTextInput
            placeholder="Event Title"
            onChangeText={(currentEventName) => setEventName(currentEventName)}
          ></AppTextInput>
          <AppTextInput
            placeholder="Organization Name"
            onChangeText={(currentOrgName) => setOrgName(currentOrgName)}
          ></AppTextInput>
          <AppTextInput
            placeholder="Location"
            onChangeText={(currentLocation) => setLocation(currentLocation)}
          ></AppTextInput>
          <AppTextInput
            placeholder="Link for ticket purchase (optional)"
            onChangeText={(currentLink) => setLink(currentLink)}
          ></AppTextInput>
          <AppTextInput
            multiline={true}
            numberOfLines={5}
            style={{
              height: 100,
              textAlignVertical: "top",
              color: colors.lightGrey,
            }}
            placeholder="Description"
            onChangeText={(currentDescription) =>
              setDescription(currentDescription)
            }
          ></AppTextInput>
          <View style={styles.coverPage}>
            {coverImage ? (
              <View>
                <Image source={coverImage} style={styles.coverImage} />
              </View>
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  width: "90%",
                  color: colors.lightGrey,
                }}
              >
                Add Cover Image
              </Text>
            )}

            <EvilIcons
              onPress={() => setModalVisible(true)}
              name="image"
              size={36}
              color={colors.primary}
              style={styles.icon}
            />
          </View>
        </View>
      </ScrollView>
      <View>
        <AppButton
          title={"Next"}
          onPress={() =>
            handleAddingEvent(
              eventName,
              orgName,
              location,
              description,
              coverImageName
            )
          }
        ></AppButton>
      </View>
      <AppModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.inputView}>
            <View keyboardDismissMode="interactive" style={{ width: "100%" }}>
              <View style={{ flexDirection: "row" }}>
                <UtilBtn
                  title=""
                  style={{ opacity: 1, paddingRight: 2, marginBottom: 5 }}
                  icon="chevron-back"
                  onPress={() => setModalVisible(!modalVisible)}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                >
                  Select a Cover Image:
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => handleCoverImage(Studying, "Studying")}
                >
                  <Image
                    source={Studying}
                    style={
                      imageSelected === "Studying"
                        ? styles.activeImages
                        : styles.images
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCoverImage(McGill, "McGill")}
                >
                  <Image
                    source={McGill}
                    style={
                      imageSelected === "McGill"
                        ? styles.activeImages
                        : styles.images
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCoverImage(Park, "Park")}
                >
                  <Image
                    source={Park}
                    style={
                      imageSelected === "Park"
                        ? styles.activeImages
                        : styles.images
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => handleCoverImage(Concordia, "Concordia")}
                >
                  <Image
                    source={Concordia}
                    style={
                      imageSelected === "Concordia"
                        ? styles.activeImages
                        : styles.images
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCoverImage(Auditorium, "Auditorium")}
                >
                  <Image
                    source={Auditorium}
                    style={
                      imageSelected === "Auditorium"
                        ? styles.activeImages
                        : styles.images
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCoverImage(Graduation, "Graduation")}
                >
                  <Image
                    source={Graduation}
                    style={
                      imageSelected === "Graduation"
                        ? styles.activeImages
                        : styles.images
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => handleCoverImage(Frosh, "Frosh")}
                >
                  <Image
                    source={Frosh}
                    style={
                      imageSelected === "Frosh"
                        ? styles.activeImages
                        : styles.images
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCoverImage(Art, "Art")}>
                  <Image
                    source={Art}
                    style={
                      imageSelected === "Art"
                        ? styles.activeImages
                        : styles.images
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCoverImage(Sports, "Sports")}
                >
                  <Image
                    source={Sports}
                    style={
                      imageSelected === "Sports"
                        ? styles.activeImages
                        : styles.images
                    }
                  />
                </TouchableOpacity>
              </View>
              <AppButton
                title="Submit"
                style={{ marginTop: 15 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </View>
      </AppModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  newEventHeader: {
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  headerContent: {
    justifyContent: "flex-start",
    width: "100%",
  },
  paragraph: { textAlign: "center" },
  coverImage: {
    width: 75,
    height: 75,
    aspectRatio: 4 / 3,
    borderWidth: 0.5,
  },
  icon: {
    marginLeft: "auto",
  },
  coverPage: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  modalView: {
    margin: 270,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 20,
    paddingTop: 20,
    width: "86%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputView: {
    marginTop: 8,
    borderColor: colors.lightGrey,
    borderRadius: 7,
    width: "90%",
    alignSelf: "center",
    paddingTop: 20,
  },
  images: {
    width: 75,
    height: 75,
    marginTop: 10,
    borderRadius: 3,
    margin: 10,
  },
  activeImages: {
    width: 75,
    height: 75,
    marginTop: 10,
    borderRadius: 3,
    margin: 10,
    borderWidth: 3,
    borderColor: colors.primary,
  },
});

export default OrganizerNewEvent;
