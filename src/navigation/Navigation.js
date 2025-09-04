import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/Home";
import Login from "../screens/Login";
import SplashScreen from "../screens/SplashScreen";
import UserAccount from "../screens/UserAccount";
import RegisterUser from "../screens/RegisterUser";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ title: "SplashScreen", headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login",headerShown: false }}
        />
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{ title: "RegisterUser", headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home",headerShown: false }}
        />

        <Stack.Screen
          name="UserAccount"
          component={UserAccount}
          options={{ title: "UserAccount",headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
