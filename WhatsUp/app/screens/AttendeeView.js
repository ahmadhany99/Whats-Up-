import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import BottomImg from "../components/ImgOrgBottom";
import ScreenTitle from "../components/ScreenTitle";
import ScreenSubtitle from "../components/ScreenSubtitle";
import BackBtn from "../components/BackBtn";
import IOSDateTimePicker from "../components/IOSDateTimePicker";
import AndroidDateTimePicker from "../components/AndroidDateTimePicker";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AttendeeDetails from "./AttendeeDetails";
import AttendeeSchedule from "./AttendeeSchedule";

const Tab = createMaterialTopTabNavigator();

function AttendeeView() {
  const navigation = useNavigation();
  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ width: "100%", display: "flex" }}>
        <ScreenTitle style={{ alignSelf: "center" }} title={"Attendee View"} />
      </View>
      <Tab.Navigator>
      <Tab.Screen name="Details" component={AttendeeDetails} />
      <Tab.Screen name="Schedule" component={AttendeeSchedule} />
    </Tab.Navigator>
    </Screen>
  );
}

export default AttendeeView;
