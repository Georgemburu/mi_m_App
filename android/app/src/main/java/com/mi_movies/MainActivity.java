package com.mi_movies;

import android.os.Bundle;//here

import com.facebook.react.ReactActivity;

// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here

// added for react navigation
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;


// dex

//end dex
// end for react navigation

public class MainActivity extends ReactActivity {

  // for react native splash screen
  @Override
  protected void onCreate(Bundle savedInstanceState){
    // SplashScreen.show(this,R.style.SplashScreenTheme);
    SplashScreen.show(this);

    super.onCreate(savedInstanceState);
  }
  // end for react native splash screen


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Mi_Movies";
  }



  // added for react navigation
 @Override
 protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
     @Override
     protected ReactRootView createRootView() {
      return new RNGestureHandlerEnabledRootView(MainActivity.this);
     }
   };
 }

  // end for react navigation
}
