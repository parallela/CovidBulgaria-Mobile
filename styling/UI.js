import { StyleSheet } from 'react-native';

export const MainUI = StyleSheet.create({
    container: {
        backgroundColor: "#073642",
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },

    searchContainer: {
        backgroundColor: '#073642',
        borderWidth: 0,
        shadowColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});