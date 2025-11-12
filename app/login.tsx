// app/login.tsx
import FormInput from "@/components/FormInput";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { Link, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "386135433574-kalhjjqt3rajrkusejnsihranetq5v4l.apps.googleusercontent.com", // Ganti dengan Client ID Anda
    redirectUri: AuthSession.makeRedirectUri(),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential)
        .then((userCredential) => {
          console.log("User logged in with Google:", userCredential.user);
        })
        .catch((error) => {
          console.error("Error logging in with Google:", error);
        });
    }
  }, [response]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      router.replace("/(tabs)/home");
      console.log("User logged in:", user);
    } catch (error: any) {
      console.error("Error logging in:", error);
      alert("Error logging in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-secondary px-6 justify-center">
      {/* Title */}
      <Text className="text-3xl font-poppins-bold text-primary mb-1">
        TekniSini.
      </Text>
      <Text className="text-2xl font-poppins-bold text-black mb-8">
        Masuk Akun
      </Text>

      {/* Input Fields */}
      <FormInput
        placeholder="Alamat Email"
        value={email}
        onChangeText={setEmail}
      />
      <FormInput
        placeholder="Kata Sandi"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Forgot Password */}
      {/* <TouchableOpacity className="items-end mt-2">
        <Text className="text-[13px] text-primary font-poppins-medium">
          Lupa Kata Sandi
        </Text>
      </TouchableOpacity> */}

      {/* Login Button */}
      <TouchableOpacity
        className="bg-primary py-3 rounded-full mt-6"
        onPress={handleSignIn}
      >
        <Text className="text-center text-white font-poppins-bold text-[16px]">
          Masuk
        </Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <Text className="text-center text-gray-500 mt-6 mb-3 font-poppins-medium">
        atau Masuk dengan
      </Text>

      {/* Social Buttons */}
      <View className="flex-row justify-center gap-8">
        <TouchableOpacity
          onPress={() => {
            promptAsync();
          }}
        >
          <Image
            source={require("@/assets/images/google.png")}
            className="w-16 h-16 bg-white rounded-full"
          />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Image
            source={require("@/assets/images/facebook.png")}
            className="w-16 h-16 bg-white rounded-full"
          />
        </TouchableOpacity> */}
      </View>

      {/* Footer Link */}
      <View className="flex-row justify-center mt-10">
        <Text className="font-poppins-medium text-gray-700">
          Belum memiliki akun?{" "}
        </Text>
        <Link href="/register" className="text-primary font-poppins-bold">
          Daftar
        </Link>
      </View>
    </View>
  );
}
