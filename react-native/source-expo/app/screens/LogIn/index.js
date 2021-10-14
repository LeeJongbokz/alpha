import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from "@components"; 

import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const StyledText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`;

const LogIn = () => {
    return (
        <Container>
            <TextInput style={styles.input}></TextInput>
            <TextInput style={styles.input}></TextInput>
        </Container>
    );
}

const styles = StyleSheet.create({
    input:{
        width: 250,
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})

export default LogIn;