import { View, Text, TextInput } from "react-native";

interface FormFieldMultipleLineProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (value: string) => void;
  otherStyles?: string;
  textStyles?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

const FormFieldMultipleLine: React.FC<FormFieldMultipleLineProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  textStyles,
  keyboardType,
  ...props
}) => {
  return (
    <View className={`space-y-0 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">Description</Text>

      <View className="w-full h-24 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row mt-1 relative">
        <TextInput
          className={`flex-1 text-white font-psemibold text-base ${textStyles}`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          multiline={true}
          onChangeText={handleChangeText}
          keyboardType="default"
          maxLength={100}
        />
        {/* Counter with absolute positioning */}
        <View className="absolute bottom-2 right-2 px-1 py-1 rounded">
          <Text className="text-gray-50 font-pmedium text-sm opacity-60">
            {value.length}/100
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FormFieldMultipleLine;
