import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
  Image
} from 'react-native';
import { connect } from "react-redux"
import {changeCount} from "./redux/actions/counts"
import { getUsersFetch , getProductFetch, changeProductStatus } from './redux/actions/counts';



class App extends Component {
  constructor() {
    super()
  }

  decrementCount() {
    let { count, changeCount } = this.props;
    count--;
    changeCount(count)
  }
  incrementCount() {
    let { count, changeCount } = this.props;
    count++;
    changeCount(count)
    // actions.changeCount(count.count)
  }

  getData() {
    let {getUsersFetch, getProductFetch} =  this.props;
    getProductFetch()
  }

  downloadImage(id) {
    
  
      this.props.changeProductStatusAction(id,true,'abc')
  }

  render() {
    const { count, users , products } = this.props;
    return (
      <View styles={styles.container}>
        <Button
          title="increment"
          onPress={() => this.incrementCount()}
        />
        <Text>{count}</Text>
        <Button
          title="decrement"
          onPress={() => this.decrementCount()}
        />
        {/* <Button 
          title="Get users"
          onPress={() => this.getData()}
        />
        {
          users.map((user) => (
            <Text key={user.name}>{user.name}</Text>
          ))
        } */}
        
         <Button 
          title="Get products"
          onPress={() => this.getData()}
        />

      { products !== undefined &&  products.length > 0 && 
        <FlatList
          data={products}
          extraData={this.props.products}
          renderItem={({item}) => (
            <View style={{marginLeft  :"5%", marginRight : "5%"}}>
               <Text>{item.title}</Text>
               <Image 
                 style={{
                  width : "90%", 
                  height : 200,
                  marginBottom : 20
                 }}
                 source={{uri : item.thumbnail}}
                />
                <Text>Downlaod Status : {!item.isDownloaded ? "NOT DOWNLOADED" : "DOWNLOADED"}</Text>
                <Text>Download Path : {item.downloadPath}</Text>
                <Button title="Download Image" onPress={() => this.props.changeProductStatusAction(item.id,true,'abc')} />
            </View>
          )}
         />
      }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    count : state.count.count,
    users : state.count.users,
    products : state.count.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCount : (params) => {
      dispatch(changeCount(params))
    },
    getUsersFetch : () => {
      dispatch(getUsersFetch())
    },
    getProductFetch : () => {
      dispatch(getProductFetch())
    },
    changeProductStatusAction : (id,status,path) => {
      dispatch(changeProductStatus(id,status,path))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)

// export default App;