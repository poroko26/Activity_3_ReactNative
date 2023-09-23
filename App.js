import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { StyleSheet } from 'react-native';

const MainScreen = ({onFlashlightClick, onCounterClick}) => {
  const [flashlightEnabled, setFlashlightEnabled] = useState(true);
  const [counterEnabled, setCounterEnabled] = useState(true);

  return (
    <View style={styles.topBtnContainer}>
          {flashlightEnabled && <Button title="F-Light" onPress={onFlashlightClick} disabled={false} />}
            {counterEnabled && <Button title="Counter" onPress={onCounterClick} disabled={false}/>}
    </View>
  );
};

const FlashlightComponent = ({ onBack, buttonsDisabled }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleFlashlight = () => {
    setIsOn(!isOn);
  };

  return (
    <View>

      <View style={styles.topBtnContainer}>
        <Button title="F-Light" onPress={toggleFlashlight} disabled={buttonsDisabled} />
        <Button title="Counter" onPress={toggleFlashlight} disabled={buttonsDisabled} />
      </View>

     <View style={styles.wholeContainer}>
     <View style={styles.imageContainer}>
        <Image source={isOn ? require('./assets/lightOn.png') : require('./assets/lightOff.png')}
        style={{ width: 100, height: 100 }}
      />     
      <View style={styles.lightBtnContainer}>
        <Button title={isOn ? 'Off' : 'On'} onPress={ toggleFlashlight} />
        <Button title="Back" onPress={onBack} />
      </View>
     </View>
    </View>
    </View>
  );
};

const CounterComponent = ({ onBack, toggleFlashlight, buttonsDisabled}) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <View>
      <View style={styles.topBtnContainer}>
        <Button title="F-Light" onPress={toggleFlashlight} disabled={buttonsDisabled} />
        <Button title="Counter" onPress={toggleFlashlight} disabled={buttonsDisabled} />
      </View>
      <View style={styles.counterContainer}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{count}</Text>
      </View>
        <View style={styles.btnInDe}>
          <Button title="-1" onPress={decrement} />
          <Button title="+1" onPress={increment} />
        </View>
      <View style={styles.backBtnInCounter}>
        <Button title="Back" onPress={onBack} /> 
      </View>
    </View>
    </View>
  );
};

export default function App() {
  const [currentComponent, setCurrentComponent] = useState('Main');
  const [buttonsDisabled, setButtonsDisabled] = useState(false);


  const toggleComponent = (component) => {
    setCurrentComponent(component);
  };

  return (
    <View style={styles.container}>
      {currentComponent === 'Main' && (
        <MainScreen
          onFlashlightClick={() => {toggleComponent('Flashlight');
          setButtonsDisabled(true);
        }}
          onCounterClick={() => {toggleComponent('Counter')
          setButtonsDisabled(true);}}
        />
      )}
      {currentComponent === 'Flashlight' && (
        <FlashlightComponent onBack={() => {toggleComponent('Main'); setButtonsDisabled(false)}} 
        buttonsDisabled={buttonsDisabled}flashlightEnabled={true}/>
      )}
      {currentComponent === 'Counter' && (
        <CounterComponent onBack={() => {toggleComponent('Main'); setButtonsDisabled(false)}} 
        buttonsDisabled={buttonsDisabled} counterEnabled={true}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },

  topBtnContainer: {
    width: 200,
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  wholeContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  imageContainer: {
    marginTop: 200,
  },

  lightBtnContainer: {
    height: 100,
    marginTop: 30,
    justifyContent: 'space-between'
  },

  counterContainer: {
    marginTop: 200, 
    justifyContent: 'center',
    alignItems: 'center',
    width: 200
  },

  numberContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },

  number: {
    fontSize: 100,
    justifyContent: 'center'
  },

  btnInDe: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
  },

  backBtnInCounter: {
    width: 90,
  }



});
