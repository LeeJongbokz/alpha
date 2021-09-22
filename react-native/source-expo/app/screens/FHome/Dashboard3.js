import {
    CardReport03,
    CardReport07,
    SafeAreaView,
    ProfileGridSmall,
    CardReport08,
    Header,
    Icon,
    StackedBarChart,
    Text
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { FHotNews, FNews, FRecentTransactions } from "@data";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import Categories from "./Categories";
import HeaderCard from "./HeaderCard";
import HeaderHome from "./HeaderHome";
import TitleList from "./TitleList";
import styles from "./styles";

const Dashboard3 = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const navigation = useNavigation();

    
    const data = {
        labels: ["January", "Febuary"],
        legend: [t("income"), t("expense")],
        data: [
            [500, 300],
            [300, 200],
        ],
        barColors: [BaseColor.pinkLightColor, BaseColor.accentColor],
    };

    const goToScreen = (name) => name && navigation.navigate(name);

    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView, { flex: 1 }]}
            edges={["right", "top", "left"]}
        >
            <Header
                title={t("Portfolio")}
                renderLeft={() => {
                    return (
                        <Icon
                            name="angle-left"
                            size={20}
                            color={colors.text}
                            enableRTL={true}
                        />
                    );
                }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
            />
            <HeaderHome
                style={{ marginBottom: 5 }}
                onPressRight={() => navigation.navigate("FNotification")}
            />
            <ScrollView
                // contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ paddingHorizontal: 20 }}>
                    <HeaderCard
                        isPrimary
                        disabled
                    />
                    {/*<TitleList
                        title={t("recent_transactions")}
                        textMore={t("view_all")}
                        onPress={() => goToScreen("FChooseFriend")}
                    />*/}
                    {/*<View style={{ flexDirection: "row", marginBottom: 10 }}>
                        {FRecentTransactions.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <ProfileGridSmall
                                    image={item.image}
                                    name={item.name}
                                    onPress={() => goToScreen("FSendMoney")}
                                />
                            </View>
                        ))}
                    </View>*/}
                    <CardReport08
                        style={{ marginBottom: 20 }}
                        percent={50}
                        title="Current Goal"
                        subTitle="Accumulate $29,000"
                        description="This is Dashboard3"
                        onPress={() => navigation.navigate("FCryptol02")}
                    />
                    {/* <Categories style={{ marginVertical: 0 }} /> */}
                </View>
                {/* <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {FHotNews.map((item, index) => (
                        <CardReport03
                            key={item.id}
                            isUp={item.isUp}
                            style={{ width: 150, margin: 5 }}
                            icon={item.icon}
                            title={item.title}
                            price={item.price}
                            subTitle={item.subTitle}
                            percent={item.percent}
                            colorIcon={item.colorIcon}
                            backgroundIcon={item.backgroundIcon}
                            onPress={() => {}}
                        />
                    ))}
                </ScrollView> */}
                <ScrollView
                contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                >
                <View
                    style={{
                        flexDirection: "row",
                        paddingTop: 20,
                        paddingBottom: 10,
                    }}
                >
                    <Icon name="chevron-left" size={12} />
                    <Text body2 style={{ flex: 1, textAlign: "center" }}>
                        2021 June
                    </Text>
                    <Icon name="chevron-right" size={12} />
                </View>
                <StackedBarChart data={data} />
                </ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    {FNews.map((item, index) => (
                        <CardReport07
                            key={item.id}
                            style={{ marginBottom: 15 }}
                            icon={item.icon}
                            title={item.title}
                            subTitle={item.subTitle}
                            price={item.price}
                            percent={item.percent}
                            isUp={item.isUp}
                            onPress={() => navigation.navigate("Dashboard4")}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Dashboard3;
