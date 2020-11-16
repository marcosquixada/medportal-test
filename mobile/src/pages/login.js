import React from "react";
import { Card, Button, FormLabel, FormInput, View } from "react-native";
import { onSignIn } from "../service/auth";

export default ({ navigation }) => (
    <View style={{ paddingVertical: 20 }}>
        <Card>
            <FormLabel>E-mail</FormLabel>
            <FormInput placeholder="Digite seu e-mail" />
            <FormLabel>Senha</FormLabel>
            <FormInput secureTextEntry placeholder="Digite sua senha" />

            <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="#03A9F4"
                title="Entrar"
                onPress={() => {
                    onSignIn().then(() => navigation.navigate("SignedIn"));
                }}
            />
        </Card>
    </View>
);