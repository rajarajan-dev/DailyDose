import { View, Text, SafeAreaView, ScrollView } from "react-native";
import PasscodeField from "@/src/components/PasscodeField";
import CustomButton from "@/src/components/ui/CustomButton";
import { router } from "expo-router";

const UpdatePasscode = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="mt-10 p-4">
          <PasscodeField
            title="Current Passcode"
            otherStyles="w-16"
            textStyles="text-center"
          />

          <PasscodeField
            title="New Passcode"
            otherStyles="w-16"
            textStyles="text-center"
          />

          <PasscodeField
            title="Confirm Passcode"
            otherStyles="w-16"
            textStyles="text-center"
          />

          <CustomButton
            title="Change Passcode"
            handlePress={() => {
              router.back();
            }}
            containerStyles="mt-7"
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdatePasscode;
