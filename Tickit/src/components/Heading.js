import React, { Component } from 'react';

import { StyleSheet, Text } from 'react-native';

const Heading = props => {
    return (
        <Text style={props.styles && props.styles.textLabel ? props.styles.textLabel : styles.textLabel}>
            {props.text}
        </Text>
    );
};

const styles = StyleSheet.create({
    textLabel: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Verdana',
        marginBottom: 80,
        marginTop: 50,
        color: '#595856'
    }
});

export default Heading;
