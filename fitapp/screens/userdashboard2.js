import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Globalstyles } from "../styles/global";
import ProgressCircle from "react-native-progress-circle";
import { ProgressBar, Colors } from "react-native-paper";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { SelectList } from "react-native-dropdown-select-list";
import { ScrollView } from "react-native";
import Card from "../components/recentCard";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

var fullWidth = Dimensions.get("window").width;
let globalusername = null;
let recentdata = [];

var totalProts;

var currentProts;
var totalCarbs;
var totalFats;

var achProts;
var achFats;
var achCarbs;

var totalWeeklyCalories2;
var achWeeklyCals2;

var totalMonthlyCalories2;
var achMonthlyCals2;

var totalCalories1;

const USRDASH2 = ({ navigation, route }) => {
  let globaldata = [];
  let totaldata = [];
  let globaldata1 = [];
  let weeklydata = [];
  let monthlydata = [];

  const [email1, setEmail] = useState("");

  const [datax, setData] = useState({});
  const [datan, setDatan] = useState({});

  const [dataz, setDataz] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  var err = 0;
  const [prots, setProts] = useState(0.0);
  const [carbs, setCarbs] = useState(0.0);
  const [fats, setFats] = useState(0.0);
  const [achCalories, setAchCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const [achWeeklyCalories, setAchWeeklyCalories] = useState(0);
  const [totalWeeklyCalories, setTotalWeeklyCalories] = useState(0);

  const [achMonthlyCalories, setAchMonthlyCalories] = useState(0);
  const [totalMonthlyCalories, setTotalMonthlyCalories] = useState(0);

  const [dailyCalories, setDailyCalories] = useState(0.0);
  const [weeklyCalories, setWeeklyCalories] = useState(0.0);
  const [monthlyCalories, setMonthlyCalories] = useState(0.0);

  React.useEffect(() => {

    // setIsLoading(true)
    const getDataFromScreenA = async () => {
      try {
        const email = await AsyncStorage.getItem("dataKey1");
        console.log("store: " + email);
        globalusername = email;

        axios
        .post(
          "http://192.168.18.102:3000/TdashName",
          { email },
          { maxContentLength: 1000000 }
        )
        .then((response) => {
          if (response.data == "0") {
            setIsLoading(false);
            alert("Error!", "Try Again Later!");
            console.log("NO DATA FOUND name " + response.data);
          }
          // setIsLoading(false);
          globaldata1 = [...response.data];
          console.log("1"+globaldata);

          myd1 = {
            ...globaldata1[0],
          };
          setDataz({
            ...globaldata1[0],
          });
        })
        .catch((error) => {
          setIsLoading(false);
          alert("Network Error");
          console.log(error);
        });
      // setIsLoading(false);


        axios
          .post(
            "http://192.168.18.102:3000/recentmeals",
            { email },
            { maxContentLength: 1000000 }
          )
          .then((response) => {
            if (response.data == "0") {
              // setIsLoading(false);
              // alert("Error!", "Try Again Later!");
              console.log("NO DATA FOUND " + response.data);
            }
            // setIsLoading(false);
            recentdata = [...response.data];
            // console.log(recentdata);
          })
          .catch((error) => {
            // setIsLoading(false);
            // alert("Network Error");
            console.log(error);
          });
        //TOTAL CALORIES
        axios
          .post(
            "http://192.168.18.102:3000/totalCalories",
            { email },
            { maxContentLength: 1000000 }
          )
          .then((response) => {
            if (response.data == "0") {
              setIsLoading(false);
              // alert("Error!", "Try Again Later!");
              console.log("NO DATA FOUND TOTAL " + response.data);
            }

            totaldata = [...response.data];

            myd = {
              ...totaldata[0],
            };
            // setData(tota;data[0]);

            console.log("total" + totaldata[0]);

            //Daliy Calories
            totalCalories1 = totaldata[0].totalcalories;
            setTotalCalories(totalCalories1);
            // const achCalories1 = globaldata[0].achievedcal;
            // const currentCalories = 0;
            // proteins
            totalProts = totaldata[0].totalproteins;
            totalFats = totaldata[0].totalfats;
            totalCarbs = totaldata[0].totalcarbs;
            console.log("carbs " + totalProts);

            // setIsLoading(false);
          })
          .catch((error) => {
            // setIsLoading(false);
            alert("Network Error");
            console.log(error);
          });

        // WEEKLY CALORIES
        axios
          .post(
            "http://192.168.18.102:3000/weeklyCalories",
            { email },
            { maxContentLength: 1000000 }
          )
          .then((response) => {
            if (response.data == "0") {
              setIsLoading(false);
              // alert("Error!", "Try Again Later!");
              console.log("NO DATA FOUND w" + response.data);
            }

            weeklydata = [...response.data];

            // setData(tota;data[0]);

            console.log("totalWEEKLY: " + weeklydata[0]);

            totalWeeklyCalories2 = weeklydata[0].total_calories;
            achWeeklyCals2 = weeklydata[0].total_achieved_calories;

            const currentWeeklyCalories =
              (achWeeklyCals2 / totalWeeklyCalories2) * 100;

            console.log(currentWeeklyCalories);
            setWeeklyCalories(currentWeeklyCalories);
            setAchWeeklyCalories(achWeeklyCals2);
            setTotalWeeklyCalories(totalWeeklyCalories2);

            // setIsLoading(false);
          })
          .catch((error) => {
            // setIsLoading(false);
            alert("Network Error");
            console.log(error);
          });

        // MONTHLY CALORIES
        axios
          .post(
            "http://192.168.18.102:3000/monthlyCalories",
            { email },
            { maxContentLength: 1000000 }
          )
          .then((response) => {
            if (response.data == "0") {
              setIsLoading(false);
              // alert("Error!", "Try Again Later!");
              console.log("NO DATA FOUND month" + response.data);
            }

            monthlydata = [...response.data];

            myd = {
              ...totaldata[0],
            };
            // setData(tota;data[0]);

            console.log("MONTLY: " + monthlydata[0]);

            totalMonthlyCalories2 = monthlydata[0].total_calories;
            achMonthlyCals2 = monthlydata[0].total_achieved_calories;

            const currentMonthlyCalories =
              (achMonthlyCals2 / totalMonthlyCalories2) * 100;
            setMonthlyCalories(currentMonthlyCalories);
            setAchMonthlyCalories(achMonthlyCals2);
            setTotalMonthlyCalories(totalMonthlyCalories2);
            // setIsLoading(false);
          })
          .catch((error) => {
            // setIsLoading(false);
            alert("Network Error");
            console.log(error);
          });

        // DAILY CALORIES
        axios
          .post(
            "http://192.168.18.102:3000/dailyCalories",
            { email, formattedDate },
            { maxContentLength: 1000000 }
          )
          .then((response) => {
            if (response.data == "0") {
              setIsLoading(false);
              // alert("Error!", "Try Again Later!");
              console.log("NO DATA FOUND daily " + response.data);
            }

            globaldata = [...response.data];

            // myd = {
            //   ...globaldata[0],
            // };
            // setData(globaldata[0]);

            console.log("glob" + globaldata[0]);

            //Protein

            // console.log("datax prots"+totalProts);
            achProts = globaldata[0].achievedprots;
            // const currentProts =0.0;
            currentProts = achProts / totalProts;

            //Carbs

            achCarbs = globaldata[0].achievedcarbs;
            // const currentCarbs =0.0;
            const currentCarbs = achCarbs / totalCarbs;

            // Fats

            achFats = globaldata[0].achievedfats;
            // const currentFats =0.0;
            const currentFats = achFats / totalFats;

            //Daliy Calories
            // const totalCalories1 = globaldata[0].totalcals;
            const achCalories1 = globaldata[0].achievedcal;
            // const currentCalories = 0;
            const currentCalories = (achCalories1 / totalCalories1) * 100;
            console.log(totalCalories1);

            // console.log(currentMonthlyCalories);

            setProts(currentProts);
            setCarbs(currentCarbs);
            setFats(currentFats);
            setAchCalories(achCalories1);

            setDailyCalories(currentCalories);

            console.log("usetate1 month " + achMonthlyCals2);
            console.log("calories: " + achCalories1);
            setIsLoading(false);
          })
          .catch((error) => {
            // setIsLoading(false);
            achProts = 0;
            achCarbs = 0;
            achFats = 0;
            setProts(0);
            setCarbs(0);
            setFats(0);
            setAchCalories(0);
            setDailyCalories(0);

            alert("Your calories have been reset to 0");

            console.log(error);
          });

        // setIsLoading(false);
      } catch (error) {
        console.log("Error retrieving data from AsyncStorage:", error);
      }
    };

    getDataFromScreenA();

    //name req
  }, []);

  // React.useEffect(() => {
  //   const getDataFromScreenA = async () => {
  //     try {
  //       const email = await AsyncStorage.getItem("dataKey1");
  //       console.log("store: " + email);
  //       globalusername = email;

       
  //   };

  //   getDataFromScreenA();
  // }, []);

  // console.log('email:'+email1);
  // console.log("prots:" + prots);

  const [error, setError] = useState("");

  const [selected, setSelected] = React.useState("");

  const data = [
    { key: "270", value: "Tandoori Chicken Karahi" },
    { key: "274", value: "Chicken Biryani" },
    { key: "254", value: "Cheese Omlette--2 Eggs, Shredded Cheese" },
    { key: "140", value: "Homemade Brown- Whole Grains Roti - Roti" },
    { key: "155", value: "Nestle - Milk Pak (Full Cream Milk)" },
    { key: "280", value: "Eggs - Boiled Egg" },
    { key: "340", value: "tesco - tikka chicken breast" },
    { key: "254", value: "Omlette - Cheese Omlette--2 Eggs, Shredded Cheese" },
    { key: "59", value: "Dawn - Bran bread" },
    { key: "60", value: "Indian - Roti" },
    { key: "56", value: "Zaanse Mayonaise - Mayonaise" },
    {
      key: "484",
      value: "Home Made - Aloo Keema(Beef Mince With Diced Potato)",
    },
    { key: "386", value: "Homemade - Keema Beef (Punjabi)" },
    { key: "218", value: "Mango Shake Home Made - Mango Shake" },
    { key: "220", value: "Kfc - Grilled Chicken Breast Piece" },
    { key: "154", value: "Kfc - Fries, 0.5 Regular" },
    { key: "210", value: "Banana, 2 medium" },
    { key: "128", value: "Homemade - Raita" },
    { key: "34", value: "Egg white, 2 large" },
    { key: "200", value: "Heb Peanut Butter - Peanut Butter" },
    { key: "95", value: "Stonefire - Tandoor Baked Naan" },
    { key: "484", value: "Homemade - Keema Aloo" },
  ];

  const resdata = [
    { key: "350", value: "Chicken Karahi - Kolachi" },
    { key: "150", value: "Chicken Malai Boti - Kolachi" },
    { key: "250", value: "Chicken Tikka (Leg) - Kababjees" },
    { key: "373", value: "Chicken Biryani - Al Rahman Biryani" },
    { key: "383", value: "Beef Biryani - Al Rahman Biryani" },
    { key: "300", value: "Katakat - Cafe Lazeez" },
    { key: "348", value: "Margherita Pizza - Xanders" },
    { key: "360", value: "Pasta Alfredo - Xanders" },
    { key: "530", value: "Big Mac - Mcdonalds" },
    { key: "520", value: "Quarter Pounder with Cheese - Mcdonalds" },
    { key: "330", value: "Hot Fudge Sundae - Mcdonalds" },
    { key: "230", value: "Small French Fries - Mcdonalds" },,
    { key: "340", value: "Medium French Fries - Mcdonalds" },
    { key: "510", value: "Large French Fries - Mcdonalds" },
  ];
  
 
  
  const [count, setCount] = useState(0);
  const [menuInput, setMenuInput] = useState(null);
  const [resInput, setResInput] = useState(null);
  const [ingredeientInput, setIngredeientInput] = useState(null);


  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [selectedOption, setSelectedOption] = useState('');

  const [formData, setFormData] = useState({
    foodname: "",
    calories: "",
    carbs: "",
    proteins: "",
    fats: "",
    errors: {},
  });

  const [targetData, setTargetData] = useState({
    email: "",
    dailycals: "",
    weeklycals: "",
    monthlycals: "",
    dailycarbs: "",
    dailyprots: "",
    dailyfats: "",
  });

  const validateTargetForm = () => {
    let errors = {};

    if (!targetData.dailycals) {
      errors.name = " Food name is required";
      err = err + 1;
    }
    if (!targetData.dailycarbs) {
      err = err + 1;
    }
    if (!targetData.dailyfats) {
      err = err + 1;
    }
    if (!targetData.dailyprots) {
      err = err + 1;
    }

    setFormData({ ...formData, errors });
  };

  function validateInputFields(inputText, selectList1, selectList2) {
    const filledFields = [inputText, selectList1, selectList2].filter(
      (field) => field !== ""
    );

    if (filledFields.length === 1) {
      // Only one field is filled, others are empty
      return true;
    } else {
      // More than one or none of the fields are filled
      err = err + 1;
      console.log("no" + err);
    }
  }
  const currentDate = new Date();

  // Format the date as desired
  const formattedDate = currentDate
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  // console.log('date: '+formattedDate);
  // console.log('global email:' +globalusername);
  const pressHandler = () => {
    // console.log(globalusername);
    // validateInputFields();
    console.log("PRESSED");
    let totalCalories1 = parseInt(formData.calories) + parseInt(achCalories);
    let totalProteins1 = parseInt(formData.proteins) + parseInt(achProts);
    let totalCarbs1 = parseInt(formData.carbs) + parseInt(achCarbs);
    let totalFats1 = parseInt(formData.fats) + parseInt(achFats);

    let achweeklyy = parseInt(formData.calories) + parseInt(achWeeklyCals2);
    let achmonthlyy = parseInt(formData.calories) + parseInt(achMonthlyCals2);
    // console.log(achmonthlyy);
    if (err == 0) {
      const data = {
        data1: {
          email: globalusername,
          date: formattedDate,
          achcals: totalCalories1,
          achprots: totalProteins1,
          achcarbs: totalCarbs1,
          achfats: totalFats1,
        },

        data2: {
          email: globalusername,
          date: formattedDate,
          totWcals: totalWeeklyCalories,
          achWcals: achweeklyy,
        },

        data3: {
          email: globalusername,
          date: formattedDate,
          totMcals: totalMonthlyCalories,
          achMcals: achmonthlyy,
        },
      };
      console.log(data);
      // console.log(data1);
      setCount(count + 1);

      axios
        .post("http://192.168.18.102:3000/addData2", data)
        .then((response) => {
          // console.log(response);
          // navigation.navigate("Signin",{signupData});
          setModalVisible(false);
          Alert.alert("Calories Added");
        })

        .catch((error) => {
          Alert.alert(
            "Server Error"
            // "This is the alert message.",
          );
          console.log(error);
        });

      setCount(count + 1);

      const getDataFromScreenA = async () => {
        try {
          const email = await AsyncStorage.getItem("dataKey1");
          console.log("store: " + email);
          globalusername = email;

          // axios
          //   .post(
          //     "http://192.168.18.102:3000/recentmeals",
          //     { email },
          //     { maxContentLength: 1000000 }
          //   )
          //   .then((response) => {
          //     if (response.data == "0") {
          //       setIsLoading(false);
          //       // alert("Error!", "Try Again Later!");
          //       console.log("NO DATA FOUND " + response.data);
          //     }
          //     // setIsLoading(false);
          //     recentdata = [...response.data];
          //     console.log(recentdata);
          //   })
          //   .catch((error) => {
          //     // setIsLoading(false);
          //     // alert("Network Error");
          //     console.log(error);
          //   });

          // axios
          //   .post(
          //     "http://192.168.18.102:3000/dailyCalories",
          //     { email,formattedDate },
          //     { maxContentLength: 1000000 }
          //   )
          //   .then((response) => {
          //     if (response.data == "0") {
          //       setIsLoading(false);
          //       // alert("Error!", "Try Again Later!");
          //       console.log("NO DATA FOUND " + response.data);
          //     }

          //     globaldata = [...response.data];

          //     myd = {
          //       ...globaldata[0],
          //     };
          //     setData(globaldata[0]);

          //     console.log("glob" + globaldata[0]);

          //     //Protein
          //     totalProts = globaldata[0].totalprots;
          //     // console.log("datax prots"+totalProts);
          //     achProts = globaldata[0].achprots;
          //     // const currentProts =0.0;
          //     currentProts = achProts / totalProts;

          //     //Carbs
          //     totalCarbs = globaldata[0].totalcarbs;
          //     achCarbs = globaldata[0].achcarbs;
          //     // const currentCarbs =0.0;
          //     const currentCarbs = achCarbs / totalCarbs;

          //     // Fats
          //     totalFats = globaldata[0].totalfats;
          //     achFats = globaldata[0].achfats;
          //     // const currentFats =0.0;
          //     const currentFats = achFats / totalFats;

          //     //Daliy Calories
          //     const totalCalories1 = globaldata[0].totalcals;
          //     const achCalories1 = globaldata[0].achcals;
          //     // const currentCalories = 0;
          //     const currentCalories = (achCalories1 / totalCalories1) * 100;

          //     totalWeeklyCalories2 = globaldata[0].totalweekly;
          //     achWeeklyCals2 = globaldata[0].achweekly;

          //     const currentWeeklyCalories =
          //       (achWeeklyCals2 / totalWeeklyCalories2) * 100;

          //     totalMonthlyCalories2 = globaldata[0].totalmonthly;
          //     achMonthlyCals2 = globaldata[0].achmonthly;

          //     const currentMonthlyCalories =
          //       (achMonthlyCals2 / totalMonthlyCalories2) * 100;

          //     // console.log(currentMonthlyCalories);

          //     setProts(currentProts);
          //     setCarbs(currentCarbs);
          //     setFats(currentFats);
          //     setAchCalories(achCalories1);
          //     setTotalCalories(totalCalories1);

          //     setDailyCalories(currentCalories);

          //     setWeeklyCalories(currentWeeklyCalories);

          //     setAchWeeklyCalories(achWeeklyCals2);
          //     setTotalWeeklyCalories(totalWeeklyCalories2);

          //     setMonthlyCalories(currentMonthlyCalories);
          //     setAchMonthlyCalories(achMonthlyCals2);
          //     setTotalMonthlyCalories(totalMonthlyCalories2);

          //     console.log("usetate1 month" + achMonthlyCals2);

          //     // setIsLoading(false);
          //   })
          //   .catch((error) => {
          //     // setIsLoading(false);
          //     alert("Network Error");
          //     console.log(error);
          //   });

          setIsLoading(false);
        } catch (error) {
          console.log("Error retrieving data from AsyncStorage:", error);
        }
      };

      getDataFromScreenA();
    } else {
      alert("Please fill fields properly");
    }

    //name req
  };
  const recentSubmit = () => {
    if (err == 0) {
      const data = {
        email: globalusername,
        foodname: formData.foodname,
        calories: formData.calories,
      };
      axios
        .post("http://192.168.18.102:3000/addrecentmeals", { data })
        .then((response) => {
          // console.log(response);
          // navigation.navigate("Signin",{signupData});
          setModalVisible1(false);
          Alert.alert("Calories Added");
          console.log("recent" + data);
        })
        .catch((error) => {
          Alert.alert("Server Error");
          console.log(error);
        });
    }
  };
  const logoutHandle = () => {
    navigation.navigate("First");
  };
  const handleSubmit = () => {
    validateTargetForm();
    if (err == 0) {
      let targetWeekCals = parseInt(targetData.dailycals) * 7;
      let targetMonthCals = parseInt(targetData.dailycals) * 30;

      // console.log(targetMonthCals);
      const data = {
        data2: {
          email: globalusername,
          totalcals: targetData.dailycals,
          totalprots: targetData.dailyprots,
          totalcarbs: targetData.dailycarbs,
          totalfats: targetData.dailyfats,
        },
        data1: {
          email: globalusername,
          targweeklycal: targetWeekCals,
          date: formattedDate,
          achCals: achWeeklyCalories,
        },
        data3: {
          email: globalusername,
          targetmonthlycal: targetMonthCals,
          date: formattedDate,
          achCals: achMonthlyCalories,
        },
      };

      // console.log(data2);
      axios
        .post("http://192.168.18.102:3000/addData", data)
        .then((response) => {
          // console.log(response);
          // navigation.navigate("Signin",{signupData});
          setModalVisible1(false);
          // Alert.alert("Calories Added");
          console.log("daily");
        })
        .catch((error) => {
          Alert.alert("Server Error");
          console.log(error);
        });

      setCount(count + 1);

      const getDataFromScreenA = async () => {
        try {
          const email = await AsyncStorage.getItem("dataKey1");
          console.log("store: " + email);
          globalusername = email;

          // setIsLoading(false);
        } catch (error) {
          console.log("Error retrieving data from AsyncStorage:", error);
        }
      };

      getDataFromScreenA();
    } else {
      alert("Plese fill all fields");
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isLoading) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.welcome}>
              <Text style={styles.welcText}>Good day, {dataz.name}</Text>
              <Pressable onPress={logoutHandle}>
                <Image
                  style={styles.logout}
                  source={require("../assets/logout.png")}
                ></Image>
              </Pressable>
            </View>

            <View style={styles.container1}>
              <View style={styles.Circle}>
                <ProgressCircle
                  percent={weeklyCalories}
                  radius={50}
                  borderWidth={10}
                  color="#4CBB17"
                  shadowColor="#355E3B"
                  bgColor="#161416"
                >
                  <Text style={styles.prog1Text}>
                    {achWeeklyCalories + "/"}
                  </Text>
                  <Text style={styles.prog1Text}>{totalWeeklyCalories}</Text>
                  <Text style={styles.tot1Text}>{"Kcal"}</Text>
                </ProgressCircle>
                <Text style={styles.prog2Text}>Weekly</Text>
              </View>
              <View style={styles.Circle}>
                <ProgressCircle
                  percent={dailyCalories}
                  radius={80}
                  borderWidth={15}
                  color="#4CBB17"
                  shadowColor="#355E3B"
                  bgColor="#161416"
                >
                  <Text style={styles.progText}>{achCalories + "/"}</Text>
                  <Text style={styles.progText}>{totalCalories}</Text>
                  <Text style={styles.totText}>{"Kcal"}</Text>
                </ProgressCircle>
                <Text style={styles.prog3Text}>Today</Text>
              </View>
              <View style={styles.Circle1}>
                <ProgressCircle
                  percent={monthlyCalories}
                  radius={50}
                  borderWidth={10}
                  color="#4CBB17"
                  shadowColor="#355E3B"
                  bgColor="#161416"
                >
                  <Text style={styles.prog1Text}>
                    {achMonthlyCalories + "/"}
                  </Text>
                  <Text style={styles.prog1Text}>{totalMonthlyCalories}</Text>
                  <Text style={styles.tot1Text}>{"Kcal"}</Text>
                </ProgressCircle>
                <Text style={styles.prog2Text}>Monthly</Text>
              </View>
            </View>

            <View style={styles.leg}>
              <Text style={styles.legText}>{"Protein:"}</Text>
              <ProgressBar
                style={[styles.bar, { backgroundColor: "#5F9EA0" }]}
                progress={prots}
                color="#0047AB"
              />

              <Text style={styles.legText}>{"Carbs:"}</Text>
              <ProgressBar
                style={[styles.bar, { backgroundColor: "#F88379" }]}
                progress={carbs}
                color="#D2042D"
              />

              <Text style={styles.legText}>{"Fat:"}</Text>
              <ProgressBar
                style={[styles.bar, { backgroundColor: "#FFFF8F" }]}
                progress={fats}
                color="#FFEA00"
              />
            </View>
            {/* Set Cal Modal */}
            <Modal
              style={styles.modal}
              visible={modalVisible1}
              transparent={true}
              animationType="slide"
              onRequestClose={() => {
                setModalVisible1(false);
              }}
            >
              <View style={styles.addCAL}>
                <Pressable
                  onPress={() => {
                    setModalVisible1(false);
                    // navigation.navigate('calorie')
                  }}
                >
                  <Image
                    source={require("../assets/close.png")}
                    style={styles.image}
                  ></Image>
                </Pressable>
                <Text style={styles.addcalText}>
                  Set Your Targeted Calories
                </Text>
                {/* <Text style={styles.addcalText1}>
                  Enter Daily targeted Calories (g)
                </Text> */}
                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Calories (g)"
                  placeholderTextColor="#000"
                  value={targetData.dailycals}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailycals: text })
                  }
                ></TextInput>
                {/* <Text style={styles.addcalText1}>
                  Enter Daily targeted Proteins (g)
                </Text> */}
                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Proteins (g)"
                  placeholderTextColor="#000"
                  value={targetData.dailyprots}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailyprots: text })
                  }
                ></TextInput>

                {/* <Text style={styles.addcalText1}>
                  Enter Daily targeted Carbs (g)
                </Text> */}

                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Carbs (g)"
                  placeholderTextColor="#000"
                  value={targetData.dailycarbs}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailycarbs: text })
                  }
                ></TextInput>
                {/* <Text style={styles.addcalText1}>
                  Enter Daily targeted Fats (g)
                </Text> */}

                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Fats (g)"
                  placeholderTextColor="#000"
                  value={targetData.dailyfats}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailyfats: text })
                  }
                ></TextInput>

                <View style={styles.buttonDisplay}>
                  <Pressable style={styles.modalButton} onPress={handleSubmit}>
                    <Text style={styles.modalbuttonText}>Add</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            {/* Meal modal */}
            <Modal
              style={styles.modal}
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View style={styles.addCAL}>
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    // navigation.navigate('calorie')
                  }}
                >
                  <Image
                    source={require("../assets/close.png")}
                    style={styles.image}
                  ></Image>
                </Pressable>
                <Text style={styles.addcalText}> Add Calories By Menu</Text>
                <SelectList
                  setSelected={(menuInput) => setMenuInput(menuInput)}
                  data={data}
                  save="key"
                  boxStyles={[{ marginHorizontal: 20, width: 280 }]}
                  TextStyles={{ color: "#FFF" }}
                  dropdownStyles={[{ marginHorizontal: 20, width: 280 }]}
                  // dropdownTextStyles={{color:'#FFF'}}
                  maxHeight={150}
                />
                {error ? (
                  <Text style={Globalstyles.errortext}>{error}</Text>
                ) : null}
                <Text style={styles.addcalText}>
                  {" "}
                  Add Calories By Ingredients
                </Text>
                <SelectList
                  setSelected={(ingredeientInput) =>
                    setIngredeientInput(ingredeientInput)
                  }
                  data={data}
                  save="value"
                  boxStyles={[{ marginHorizontal: 20, width: 280 }]}
                  TextStyles={{ color: "#FFF" }}
                  dropdownStyles={[{ marginHorizontal: 20, width: 280 }]}
                  // dropdownTextStyles={{color:'#FFF'}}
                  maxHeight={150}
                />
                 <Text style={styles.addcalText}> Restaurants menu</Text>
                <SelectList
                  setSelected={(resInput) => setResInput(resInput)}
                  data={resdata}
                  save="key"
                  boxStyles={[{ marginHorizontal: 20, width: 280 }]}
                  TextStyles={{ color: "#FFF" }}
                  dropdownStyles={[{ marginHorizontal: 20, width: 280 }]}
                  // dropdownTextStyles={{color:'#FFF'}}
                  maxHeight={150}
                />
                {error ? (
                  <Text style={Globalstyles.errortext}>{error}</Text>
                ) : null}
                <Text style={styles.addcalText}> Add Calories Manually</Text>
                {/* <Text style={styles.addcalText1}>Enter Food Name</Text> */}
                <TextInput
                  style={styles.input1}
                  placeholder="Enter food name"
                  placeholderTextColor="#000"
                  value={formData.foodname}
                  onChangeText={(text) =>
                    setFormData({ ...formData, foodname: text })
                  }
                ></TextInput>
                {/* <Text style={styles.addcalText1}>Enter Calories (g)</Text> */}
                <TextInput
                  style={styles.input1}
                  placeholder="Enter Calories (g)"
                  placeholderTextColor="#000"
                  keyboardType="numeric"
                  value={formData.calories}
                  onChangeText={(text) =>
                    setFormData({ ...formData, calories: text })
                  }
                ></TextInput>
                {/* <Text style={styles.addcalText1}>Enter Carbs (g)</Text> */}
                <TextInput
                  style={styles.input1}
                  placeholder="Enter Carbs (g)"
                  placeholderTextColor="#000"
                  keyboardType="numeric"
                  value={formData.carbs}
                  onChangeText={(text) =>
                    setFormData({ ...formData, carbs: text })
                  }
                ></TextInput>
                {/* <Text style={styles.addcalText1}>Enter Fats (g)</Text> */}
                <TextInput
                  style={styles.input1}
                  placeholder="Enter Fats (g)"
                  placeholderTextColor="#000"
                  keyboardType="numeric"
                  value={formData.fats}
                  onChangeText={(text) =>
                    setFormData({ ...formData, fats: text })
                  }
                ></TextInput>
                {/* <Text style={styles.addcalText1}>Enter Daily Proteins (g)</Text> */}
                <TextInput
                  style={styles.input1}
                  placeholder="Enter Proteins (g)"
                  placeholderTextColor="#000"
                  keyboardType="numeric"
                  value={formData.proteins}
                  onChangeText={(text) =>
                    setFormData({ ...formData, proteins: text })
                  }
                ></TextInput>
                <View style={styles.buttonDisplay}>
                  <Pressable
                    style={styles.modalButton}
                    onPress={pressHandler}
                    onPressOut={recentSubmit}
                  >
                    <Text style={styles.modalbuttonText}>Update</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            <View style={styles.recent}>
              <Text style={styles.reText}>Recent Meals</Text>

              {recentdata.slice(0, 4).map((item) => (
                <Card key={item.calories} data={item} navigation={navigation} />
              ))}
            </View>
            <View style={styles.buttonDisplay}>
              <Pressable
                style={styles.mealButton}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={Globalstyles.buttonText}>Add meal</Text>
              </Pressable>

              <Pressable
                style={styles.mealButton}
                onPress={() => {
                  setModalVisible1(true);
                }}
              >
                <Text style={Globalstyles.buttonText}>Set Targets</Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161416",

    // justifyContent:'center',
  },
  logout: {
    height: 25,
    width: 25,
    marginTop: 40,
    marginRight: 15,
  },
  modal: {
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#E8EBE8",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 3,
    overflow: "scroll",
    marginHorizontal: 20,
  },
  addCAL: {
    // marginTop: 20,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 3,
    overflow: "scroll",
    marginHorizontal: 20,
  },
  recent: {
    marginHorizontal: 20,
  },
  input1: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 280,
    height: 45,
    marginHorizontal: 20,
    marginRight: 20,
    marginVertical: 10,
  },
  addcalText: {
    marginVertical: 10,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "500",
  },
  addcalText1: {
    marginVertical: 5,
    marginLeft: 20,
    fontSize: 12,
    fontWeight: "500",
  },
  reText: {
    marginVertical: 10,
    // marginLeft: 20,
    fontSize: 18,
    fontWeight: "500",
    color: "#d4dce4",
  },
  container1: {
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  Circle: {
    alignItems: "center",
    // marginTop: 30,
    marginHorizontal: 5,
    // flexDirection: "row",
    justifyContent: "center",
  },
  Circle1: {
    alignItems: "center",
    // marginTop: 30,
    marginHorizontal: 5,
    // flexDirection: "row",
    justifyContent: "center",
  },
  calendar: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: fullWidth,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161416",
  },
  image: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  calText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#228B22",
    marginLeft: 5,
  },
  calText1: {
    fontSize: 22,
    fontWeight: "400",
    color: "#228B22",
    marginLeft: 2,
  },
  progText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  prog1Text: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
  },
  prog3Text: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 10,
  },
  prog2Text: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 10,
  },

  welcText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 40,
  },
  welcome: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  totText: {
    fontSize: 24,
    color: "#707B7C",
    fontWeight: "600",
  },
  tot1Text: {
    fontSize: 14,
    color: "#707B7C",
    fontWeight: "600",
  },
  leg: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
    marginLeft: 20,
  },
  legText: {
    fontSize: 18,
    color: "#d4dce4",
    fontWeight: "400",
    paddingBottom: 5,
    paddingTop: 5,
  },
  bar: {
    width: 370,
    height: 10,
    borderWidth: 0.5,
    borderRadius: 100,
  },
  button: {
    // marginTop:20,
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 0,
    width: 120,
    height: 45,
    elevation: 3,
    backgroundColor: "#083444",
    // marginBottom:5,
  },
  mealButton: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 2,
    width: 170,
    elevation: 3,
    backgroundColor: "#FFF",
    marginBottom: 120,
    marginHorizontal: 20,
  },
  button1: {
    // marginTop:20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 0,
    width: 120,
    height: 45,
    elevation: 3,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    letterSpacing: 0.25,
    color: "#FFF",
  },
  buttonDisplay: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  submitButton: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 2,
    width: 300,
    elevation: 3,
    backgroundColor: "#FFF",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "#161416",
    borderWidth: 2,
    width: 150,
    elevation: 3,
    backgroundColor: "#161416",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  modalbuttonText: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "400",
    letterSpacing: 0.25,
    color: "#FFF",
  },
});
export default USRDASH2;
