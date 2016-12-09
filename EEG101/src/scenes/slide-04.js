import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
  Image
} from 'react-native';
import{
  Actions,
}from 'react-native-router-flux';
import { connect } from 'react-redux';

//Interfaces. For advanced elements such as graphs
import GraphView from '../interface/GraphView';
import CircBufferGraphView from '../interface/CircBufferGraphView';


import Button from '../components/Button';
import PopUp from '../components/PopUp';
import PopUpLink from '../components/PopUpLink';

// Sets isVisible prop by comparing state.scene.key (active scene) to the key of the wrapped scene
function  mapStateToProps(state) {
    return {isVisible: state.scene.sceneKey === 'SlideFour'};
    
  }



class SlideFour extends Component {
  constructor(props) {
    super(props);


      // Initialize States
    this.state = {
      popUpVisible: false,
    }
  }

  render() {
    return (
      <View style={styles.container}>
      
        <View style={styles.halfGraphContainer}>
            <GraphView style={{flex:1}} visibility={this.props.isVisible}/>
          <Text style={styles.halfGraphLabelText}>Raw</Text>

          </View>
          <View style={styles.halfGraphContainer}>
            <CircBufferGraphView style={{flex:1}} visibility={this.props.isVisible}/>
              <Text style={styles.halfGraphLabelText}>Low Pass Filter</Text>
          </View>

          <Text style={styles.currentTitle}>FILTERING</Text>

        <ViewPagerAndroid //Allows us to swipe between blocks
          style={styles.viewPager}
          initialPage={0}>

          <View style={styles.pageStyle}>
            <Text style={styles.header}>How do we get meaningful data from the EEG?.</Text>
            <Text style={styles.body}>First, the EEG must be <PopUpLink onPress={() => this.setState({popUpVisible: true})}>filtered</PopUpLink> to extract signals that don't come from the brain.
            </Text>
            <Button onPress={Actions.SlideFive}>Next</Button>
          </View>
          
        </ViewPagerAndroid>

        <PopUp onClose={() => this.setState({popUpVisible: false})} visible={this.state.popUpVisible} 
        title="Filters">
        Filters remove frequencies that sit outside the spectrum of signals produced by the brain, getting rid of a lot of the noise produced muscle activity or background electrical activity. Filters are normally either high-pass (removing low frequencies), low-pass (removing high frequencies) or bandpass (allowing only a narrow band of frequencies through). Here we have implemented a low-pass filter that removes high frequency noise.
        </PopUp>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  currentTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    color: '#6CCBEF',
  },

  body: {
    fontFamily: 'Roboto-Light',
    color: '#484848',
    fontSize: 19,
  },

  container: {
    marginTop:55,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },

  header: {
    fontFamily: 'Roboto-Bold',
    color: '#484848',
    fontSize: 20,
  },

  viewPager: {
    flex: 4,
  },

  pageStyle: {
    padding: 20,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },

  halfGraphContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch',

  },

  halfGraphLabelText: {
    position: 'absolute',
    top: 5,
    left: 5,
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    color: '#ffffff',
  },

});

export default connect(mapStateToProps)(SlideFour);