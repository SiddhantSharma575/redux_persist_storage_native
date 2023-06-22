import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
  Image,
  PermissionsAndroid
} from 'react-native';
import { connect } from "react-redux"
import {changeCount} from "./redux/actions/counts"
import { getUsersFetch , getProductFetch, changeProductStatus } from './redux/actions/counts';
import RNFetchBlob from 'rn-fetch-blob';
import NetInfo from "@react-native-community/netinfo";




class App extends Component {
  constructor() {
    super()
    this.state = {
      isOffline  : false
    }
  }
  componentDidMount() {
    NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      this.setState({
        ...this.state,
        isOffline : offline
      })
    })
  }

  componentWillUnmount() {
    
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
  checkPermission = async (id, url) => {
    if (Platform.OS === 'ios') {
      this.downloadImage(id,url);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        
        console.log('granted',granted,await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE))
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
          this.downloadImage(id,url);
        } else {
          await  PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };


  getExtention = filename => {
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };


  downloadImage(id, url) {
    let date = new Date();
    let ext = this.getExtention(url);
    ext = '.' + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
    .fetch('GET', url)
    .then(res => {
      console.log("RES -->", JSON.stringify(res))
      this.props.changeProductStatusAction(id,true,res.data)
      alert("Image Download Successfully")
    })

      // this.props.changeProductStatusAction(id,true,'abc')
  }

  render() {
    const { count, users , products } = this.props;
    console.log(this.state.isOffline)
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
                 source={{uri : this.state.isOffline && item.isDownloaded ? `file:///${item.downloadPath}` : item.thumbnail}}
                />
                <Text>Downlaod Status : {!item.isDownloaded ? "NOT DOWNLOADED" : "DOWNLOADED"}</Text>
                <Text>Download Path : {item.downloadPath}</Text>
                <Button title="Download Image" onPress={() => this.checkPermission(item.id, item.thumbnail)} />
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