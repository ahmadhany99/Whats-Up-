/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import UtilBtn from "../components/UtilBtn";
import Event from "../components/Event";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import SearchBar from "../components/SearchBar";
import { getTodayDate } from "./AttendeeDashboard";
import { format } from "date-fns";
import colors from "../config/colors";

export const convertStartDate = (number) => {
  return number ? format(new Date(number), "LLL dd, yyyy") : "";
};

function AttendeeFavorites() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [user] = useAuthState(auth);

  const getName = async () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setUserName(doc.data().firstName);
      });
    }
  };

  //function to get all the events bookmarked by the user
  const getBookMarks = async () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        const bookMarksField = doc.data().bookMarks;
        setBookmarks(bookMarksField);
      });
    }
  };

  //function to load the events depending on if they are
  //bookmarked by the user
  const getEvents = async () => {
    const q = query(
      collection(db, "events"),
      where("eventStatus", "==", "Approved")
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        {
          for (const item of bookmarks) {
            if (item == doc.id) {
              if (allEvents.length > 0)
                for (const item of allEvents) {
                  if (item.id == doc.id) {
                    break;
                  } else if (item.id == allEvents[allEvents.length - 1].id) {
                    setAllEvents((allEvents) =>
                      allEvents.concat({ id: doc.id, ...doc.data() })
                    );
                    setMasterData((allEvents) =>
                      allEvents.concat({ id: doc.id, ...doc.data() })
                    );
                    setPreviousData((allEvents) =>
                      allEvents.concat({ id: doc.id, ...doc.data() })
                    );
                  } else {
                    continue;
                  }
                }
              else {
                console.log("hey there");
                setAllEvents((allEvents) =>
                  allEvents.concat({ id: doc.id, ...doc.data() })
                );
                setMasterData((allEvents) =>
                  allEvents.concat({ id: doc.id, ...doc.data() })
                );
                setPreviousData((allEvents) =>
                  allEvents.concat({ id: doc.id, ...doc.data() })
                );
              }
            }
          }
        }
      });
    }
  };

  //function that removes the unbookmarked event from the page
  const removeEventsNotBookmarked = () => {
    for (const event of allEvents) {
      var count = 0;
      if (bookmarks.length != 0) {
        for (const bookmark of bookmarks) {
          if (event.id != bookmark && count != bookmarks.length - 1) {
            count++;
            continue;
          } else if (event.id != bookmark && count == bookmarks.length - 1) {
            setAllEvents((current) =>
              current.filter((item) => item.id !== event.id)
            );
          } else {
            break;
          }
        }
      } else {
        setAllEvents([]);
      }
    }
  };

  async function bookmarkAndgetEvents() {
    await getBookMarks();
    removeEventsNotBookmarked();
    await getEvents();
  }

  var welcome = "Welcome, " + userName + "!";

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    console.log("useeffect is used");
    getName();
    bookmarkAndgetEvents();
  }, []);

  const [displayedEvent, setDisplayedEvents] = useState(true);
  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [filteredData, setFilteredData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [filteredUserData, setFilteredUserData] = useState("");

  const ItemView = ({ item }) => {
    return (
      <Event
        image={item.coverImage}
        title={item.eventName}
        organizer={item.orgName}
        date={convertStartDate(item.startDate)}
        id={item.id}
        coverImageName={item.coverImage}
        onPress={() =>
          navigation.navigate("AttendeeView", {
            prop: item,
          })
        }
      />
    );
  };

  const searchFilter = (text) => {
    if (text && displayedEvent) {
      const newData = masterData.filter((item) => {
        const itemData = item.eventName
          ? item.eventName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const userSearch = masterData.filter((item) => {
        const itemData = item.orgName
          ? item.orgName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredUserData(userSearch);
      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    } else if (text && !displayedEvent) {
      const newData = previousData.filter((item) => {
        const itemData = item.eventName
          ? item.eventName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const userSearch = previousData.filter((item) => {
        const itemData = item.orgName
          ? item.orgName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredUserData(userSearch);
      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    } else {
      displayedEvent
        ? setFilteredData(masterData)
        : setFilteredData(previousData);
      setSearch(text);
    }
  };

  const pullMe = () => {
    setRefresh(true);
    bookmarkAndgetEvents();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  var tabs;
  var showEvents;

  showEvents = (
    <>
      <FlatList
        contentContainerStyle={{ paddingBottom: 400 }}
        data={filteredData ? filteredData : allEvents}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }
      />
      <FlatList
        data={filteredUserData ? filteredUserData : []}
        renderItem={ItemView}
      />
    </>
  );

  return (
    <Screen style={{ padding: 20, marginTop: 10 }}>
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <View>
              <Text style={{ color: colors.darkGrey, marginBottom: 8 }}>
                <Text>{getTodayDate()}</Text>
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                {welcome}
              </Text>
              <View style={styles.eventTabs}>{tabs}</View>
            </View>
            <UtilBtn
              style={{ flexDirection: "row", size: 12, marginTop: 5 }}
              icon="notifications"
              iconSize={32}
              onPress={() => navigation.navigate("AttendeeNotifications")}
              testID="notification"
            />
          </View>

          <View style={styles.searchBar}>
            <SearchBar
              placeholder="Search for event..."
              handleChange={(text) => {
                searchFilter(text);
              }}
            />
            <UtilBtn
              iconSize={32}
              style={[
                styles.button,
                { flexDirection: "row", marginLeft: "2%", marginTop: "0.5%" },
              ]}
              icon="ios-options"
              testID="filters"
              onPress={() => console.log("Filters")}
            />
          </View>
          <Text style={styles.text}>Bookmarked Events</Text>
        </View>
        {showEvents}
      </View>
      <Text style={styles.textCentered}>Pull Twice To Refresh...</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  organizer: {
    alignItems: "flex-start",
    width: "50%",
  },
  organizertwo: {
    alignItems: "flex-start",
    width: "30%",
  },
  title: {
    color: "#100101",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    color: "#969696",
    marginTop: "5%",
    fontSize: 12,
  },
  text: {
    color: "#100101",
    marginTop: "4%",
    marginBottom: "3%",
    fontSize: 16,
    fontWeight: "bold",
  },
  textCentered: {
    color: "#100101",
    marginTop: "4%",
    marginBottom: "3%",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    left: "2.5%",
    marginTop: "5%",
    flex: 1,
    marginBottom: "45%",
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AttendeeFavorites;
