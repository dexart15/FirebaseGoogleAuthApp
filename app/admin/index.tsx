import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getTechnicians } from "@/services/technicianService";
import {
  addTechnician,
  updateTechnician,
  deleteTechnician,
} from "@/services/technicianAdminService";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";

export default function AdminTechnicians() {
  const router = useRouter();
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    imageUrl: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await getTechnicians();
    setTechnicians(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await updateTechnician(editingId, form);
      setEditingId(null);
    } else {
      await addTechnician(form);
    }

    setForm({
      name: "",
      category: "",
      location: "",
      imageUrl: "",
      description: "",
    });
    loadData();
  };

  const handleEdit = (tech: any) => {
    setForm(tech);
    setEditingId(tech.id);
  };

  const handleDelete = async (id: string) => {
    await deleteTechnician(id);
    loadData();
  };

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    router.replace("/login");
  };

  return (
    <ScrollView className="flex-1 bg-[#F3F8FF] p-5 pt-20">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-primary text-3xl font-poppins-bold">
          TekniSini.
        </Text>

        <TouchableOpacity
          onPress={handleLogout}
          className="px-4 py-2 bg-red-500 rounded-full"
        >
          <Text className="text-white font-poppins-medium text-[13px]">
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-2xl font-poppins-bold text-black mb-4">
        Admin – Manage Technicians
      </Text>

      {/* Form Card */}
      <View className="bg-white rounded-xl p-5 shadow mb-6">
        <Text className="text-lg font-poppins-semibold mb-3">
          {editingId ? "Edit Technician" : "Add Technician"}
        </Text>

        <TextInput
          placeholder="Name"
          value={form.name}
          onChangeText={(v) => setForm({ ...form, name: v })}
          className="bg-gray-100 rounded-lg p-3 mb-3"
        />

        <TextInput
          placeholder="Category"
          value={form.category}
          onChangeText={(v) => setForm({ ...form, category: v })}
          className="bg-gray-100 rounded-lg p-3 mb-3"
        />

        <TextInput
          placeholder="Location"
          value={form.location}
          onChangeText={(v) => setForm({ ...form, location: v })}
          className="bg-gray-100 rounded-lg p-3 mb-3"
        />

        <TextInput
          placeholder="Image URL"
          value={form.imageUrl}
          onChangeText={(v) => setForm({ ...form, imageUrl: v })}
          className="bg-gray-100 rounded-lg p-3 mb-3"
        />

        <TextInput
          placeholder="Description"
          value={form.description}
          onChangeText={(v) => setForm({ ...form, description: v })}
          className="bg-gray-100 rounded-lg p-3 mb-3"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-primary rounded-full py-3 mt-2"
        >
          <Text className="text-center text-white font-poppins-bold">
            {editingId ? "Update Technician" : "Add Technician"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* List Section */}
      <Text className="text-xl font-poppins-semibold mb-3">
        Technician List
      </Text>

      {technicians.map((tech) => (
        <View
          key={tech.id}
          className="bg-white rounded-xl p-4 mb-3 shadow border border-gray-100"
        >
          <Text className="text-base font-poppins-semibold text-black">
            {tech.name}
          </Text>
          <Text className="text-gray-600">{tech.category}</Text>
          <Text className="text-gray-500">{tech.location}</Text>

          <View className="flex-row mt-3">
            <TouchableOpacity onPress={() => handleEdit(tech)} className="mr-6">
              <Text className="text-blue-500 font-poppins-medium">Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(tech.id)}>
              <Text className="text-red-500 font-poppins-medium">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
