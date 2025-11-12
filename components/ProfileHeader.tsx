import { auth } from "@/FirebaseConfig";
import { Image, Text, View } from "react-native";

export default function ProfileHeader() {
  const email = auth.currentUser?.email || ""; // Ambil email atau default ke string kosong
  const username = email.split("@")[0].split(".")[0]; // Ambil bagian sebelum '@' dan sebelum '.'

  return (
    <View>
      <View className="flex-row items-center mb-5">
        <Image
          source={require("@/assets/images/avatar.jpg")}
          className="w-12 h-12 rounded-full mr-3 border-primary border-2"
        />
        <View>
          <Text className="font-poppins-medium text-black">Hai {username}</Text>
          <Text className="font-poppins-medium text-grayText">
            Selamat Datang Kembali
          </Text>
        </View>
      </View>
    </View>
  );
}
