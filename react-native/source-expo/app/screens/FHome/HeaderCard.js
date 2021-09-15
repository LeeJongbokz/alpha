import { Text } from "@components";
import { useTheme } from "@config";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import styles from "./styles";

import { getUserBalance } from '../../apis';

function HeaderCard({
    isCenter = false,
    isPrimary = false,
    style = {},
    onPress = () => {},
    disabled = false
}) {

    
    const [total, setTotal] = useState(0);

    const fetchApiCall = () => {
        fetch("http://192.168.35.87:3000/api/user/balance",{
              "method": "GET",
              "headers": {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            })
              .then(response => response.json())
              .then(response => 
                setTotal(Number(JSON.stringify(response.KRWbalance)))
              )
              .catch(err => {
                console.log(err);
            });
      }



    useEffect(() => {

        fetchApiCall();
        
    }, [total]);


    const { t } = useTranslation();
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            disabled={disabled}
            style={StyleSheet.flatten([
                styles.headerCard,
                { backgroundColor: colors.card },
                isPrimary && styles.headerCardPrimary,
                isPrimary && { backgroundColor: colors.primaryLight },
                isCenter && styles.headerCardCenter,
                style,
            ])}
            onPress={onPress}
        >
            <Text subhead light={!isPrimary} whiteColor={isPrimary}>
                {t("total_balance")}
            </Text>
            <Text title1 whiteColor={isPrimary} style={{ marginTop: 5 }}>
                {total}
            </Text>
        </TouchableOpacity>
    );
}

export default HeaderCard;

