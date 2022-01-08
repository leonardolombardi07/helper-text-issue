import React from "react";
import {
  Animated,
  NativeSyntheticEvent,
  TextInput as NativeTextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";

type Inputs = "email" | "password";

export default function LoggedInScreen() {
  const emailRef = React.useRef<NativeTextInput>(null);
  const passwordRef = React.useRef<NativeTextInput>(null);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    email: null,
    password: null,
  });

  const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  function handleChange(
    { nativeEvent: { text } }: NativeSyntheticEvent<TextInputChangeEventData>,
    type: Inputs
  ) {
    setErrors((e) => ({ ...e, [type]: validate(type, text) }));
    setValues((v) => ({ ...v, [type]: text }));
  }

  async function handleSubmit() {
    if (isSubmiting) return;
    if (errors.email) return emailRef.current?.focus();
    if (errors.password) return passwordRef.current?.focus();

    setIsSubmiting(true);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject();
        }, 500);
      });
    } catch (error: any) {
      setSubmitError(error?.message || "Something went Wrong");
    } finally {
      setIsSubmiting(false);
    }
  }

  const { email, password } = values;
  return (
    <View style={{ flex: 1, padding: 100 }}>
      <TextInput
        ref={emailRef}
        label={"email"}
        value={email}
        onChange={(event) => handleChange(event, "email")}
        autoComplete={false}
        error={Boolean(errors.email)}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <HelperText padding="none" type="error" visible={Boolean(errors.email)}>
        {errors.email}
      </HelperText>

      <TextInput
        ref={passwordRef}
        label={"password"}
        value={password}
        onChange={(event) => handleChange(event, "password")}
        autoComplete={false}
        error={Boolean(errors.password)}
        onSubmitEditing={handleSubmit}
      />
      <HelperText
        padding="none"
        type="error"
        visible={Boolean(errors.password)}
        onPressIn={() => 2}
        onPressOut={() => 2}
      >
        {errors.password}
      </HelperText>

      <Button onPress={handleSubmit} loading={isSubmiting}>
        Sign In
      </Button>
    </View>
  );
}

function validate(type: Inputs, value: string): string | null {
  switch (type) {
    case "email": {
      if (value.length < 5) return null;
      const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return !value.match(emailRegex) ? "Error message" : null;
    }

    case "password": {
      return value.length > 10 ? "Error message" : null;
    }

    default:
      return null;
  }
}
