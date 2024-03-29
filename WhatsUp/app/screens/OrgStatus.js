import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
  Dimensions,
} from "react-native";
import React from "react";
import Screen from "../components/Screen";
import PropTypes from "prop-types";
import { format } from "date-fns";

OrgStatus.propTypes = {
  route: PropTypes.any,
};

export const convertTime = (number) => {
  return number ? format(new Date(number), "hh:mm aaaaa'm'") : "";
};

function OrgStatus({ route }) {
  const { prop } = route.params;

  return (
    <Screen style={{ padding: "5%", backgroundColor: "white" }}>
      <ScrollView style={{ width: "100%", display: "flex" }}>
      <View>
        <Text
          style={{
            marginBottom: "2%",
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: "1%",
          }}
        >
          Status
        </Text>
      </View>
      <View>
        <Text
          style={styles.text}
        >
          {prop.eventStatus}
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginBottom: "2%",
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: "1%",
            marginTop: "7.5%"
          }}
        >
          {prop.eventStatus === "Rejected" ? "" : "Number of Participants" }
        </Text>
      </View>
      <View>
        <Text
          style={styles.text}
        >
          {prop.eventStatus === "Rejected" ? "" : "Currently Unavailable" }
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginBottom: "2%",
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: "1%",
            marginTop: "7.5%"
          }}
        >
          {prop.eventStatus === "Rejected" ? "" : "Number of Favorites" }
        </Text>
      </View>
      <View>
        <Text
          style={styles.text}
        >
          {prop.eventStatus === "Rejected" ? "" : "Currently Unavailable" } 
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginBottom: "2%",
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: "1%",
            marginTop: "7.5%"
          }}
        >
          {prop.eventStatus === "Rejected" ? "Comments from Admin" : "" } 
        </Text>
      </View>
      <View>
        <Text
          style={styles.text}
        >
          {prop.eventStatus === "Rejected" ? prop.adminComment : "" }
        </Text>
      </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: "auto",
  },
  iconText: {
    flexDirection: "row",
    marginTop: 3,
    marginLeft: 8,
  },
  text: {
    color: "#100101",
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    marginTop: "2%",
    marginBottom: "2%",
    marginLeft: "1%",
  },
  description: {
    marginLeft: "1%",
    fontSize: 14,
    alignSelf: "flex-start",
    alignContent: "flex-start",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 4,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default OrgStatus;
