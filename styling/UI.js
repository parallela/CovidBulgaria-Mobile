import { StyleSheet } from 'react-native';

export const MainUI = StyleSheet.create({
    container: {
        backgroundColor: "#073642",
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textMiddle: {
        fontSize: 16,
        color: '#ffffff'
    },
    searchContainer: {
        backgroundColor: '#073642',
        borderWidth: 0,
        shadowColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    item: {
        flex: 1,
        padding: 12,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    title: {
        fontSize: 16,
    },
});