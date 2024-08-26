import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useBiometricAuthentication } from "@/hooks/useBiometricAuthentication";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import * as Device from 'expo-device';
import { useAuthentication } from "@/hooks/useAuthentication";

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string|undefined>();
  const { authenticate, checkBiometricSupport, isBiometricSupported, hasEnrolled } = useBiometricAuthentication();
  const { login } = useAuthentication();

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const loginOnPress = async () => {
    const deviceType = await Device.getDeviceTypeAsync();
    const { success } = await login(username, password);
    if(success) {
      router.navigate('/transaction-history');
    } else {
      if (deviceType === Device.DeviceType.DESKTOP) {
        setErrorMsg('Invalid username or password');
      } else {
        Alert.alert('Authentication failed', 'Invalid username or password. Please try again.', [{ text: 'OK' }]);
      }
      setUsername('');
      setPassword('');
    }
  };

  const handleLoginOnPress = async () => {
    const deviceType = await Device.getDeviceTypeAsync();
    
    if (deviceType === Device.DeviceType.PHONE) {
      if(isBiometricSupported && !hasEnrolled) {
        Alert.alert('Warning', 'Biometric authentication is required for login. Please enroll your biometrics in your device settings.', [{ text: 'OK' }]);
        return;
      }
  
      const result = await authenticate();
      if(!result.success) {
        Alert.alert('Authentication failed', 'Could not authenticate. Please try again.', [{ text: 'OK' }]);
        return;
      }
    } 
    router.navigate('/transaction-history');
  };

  return (
    <View
      style={styles.container}
    >
      <View style={styles.loginCard}>
        <TextInput 
          style={styles.formInput}
          placeholder="Username"
          value={username}
          onChangeText={(txt) => {setUsername(txt); setErrorMsg(undefined)}}
          autoCapitalize="none"
        ></TextInput>
        <TextInput 
          style={[styles.formInput, styles.passwordForm]}
          placeholder="Password"
          value={password}
          onChangeText={(txt) => {setPassword(txt); setErrorMsg(undefined)}}
          secureTextEntry={true}
          autoCapitalize="none"
        ></TextInput>
        {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
        <View style={styles.actionContainer}>
          <Button title="Login" onPress={loginOnPress} disabled={(!username || !password)}></Button>
          { Device.deviceType === Device.DeviceType.DESKTOP || 
          <Pressable style={[styles.loginButton, {marginTop: 15}]} onPress={handleLoginOnPress}>
              <Text style={styles.buttonTitle}>Login with biometric</Text>
          </Pressable> }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'lightgrey'
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '70%',
    padding: 10
  },
  formInput: {
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderColor: 'lightgrey', 
    borderRadius: 3,
    width: '100%',
    height: 35,
    padding: 5
  },
  passwordForm: {
    marginTop: 8
  },
  loginButton: {
    backgroundColor: 'deepskyblue',
    borderRadius: 3,
    paddingVertical: 10,
    width: '100%'
  },
  buttonTitle: {
    color: 'white', 
    textAlign: 'center',
    fontSize: 15
  },
  actionContainer: {
    width: '100%',
    marginTop: 8
  },
  errorMsg: {
    color: 'red',
    paddingVertical: 3
  }
});
