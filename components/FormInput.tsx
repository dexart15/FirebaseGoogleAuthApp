import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface FormInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string; // Tambahkan properti value
  onChangeText: (text: string) => void; // Tambahkan properti onChangeText
}

export default function FormInput({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-row items-center bg-white rounded-full px-4 py-4 my-2 border-2 border-gray-200">
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !showPassword}
        placeholderTextColor={Colors.textLight}
        autoCapitalize="none"
        className="flex-1 text-[15px] font-poppins"
        value={value} // Gunakan value dari props
        onChangeText={onChangeText} // Gunakan onChangeText dari props
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={Colors.textLight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
