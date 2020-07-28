import SlideEditorController from './SlideEditorController';
import FullscreenModeController from './fullscreenModeController';
import NavigationView from '../view/navigationView';

const App = {
  init () {
    this.view = new NavigationView(this);
    this.slideEditor = new SlideEditorController();
    this.fullscreen = new FullscreenModeController();
  },

  startFullscreen (isStatCurrentSlide) {
    const {slides, slideID, slideSize, editingSlideIndex} = this.slideEditor;
    if (slideSize === 0) return alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');
    if (!isStatCurrentSlide) return this.fullscreen.requestFullscreenMode(slides, slideID);
    return this.fullscreen.requestFullscreenMode(slides, slideID, editingSlideIndex);
  },
};

export default App;

/*
new 생성자와 함께 클래스를 사용하는 목적은 특정 유형의 객체를 생성하고 그 객체를 조작하기 위해서라고 생각합니다.
그렇기 때문에 이 부분에서 import를 위한 클래스 사용은 부적합하다고 생각합니다.
또한, 이렇게 생성된 객체는 참조가 발생하지 않아 버려진다는....?


인스턴스를 생성하지 않는 클래스..
이 부분을 왜 린트가 에러로 처리하는지 생각해봤습니다.
당연히, 클래스로 만들었으면 객체를 조작할 것이라고 생각


굳이 클래스가 필요한 부분이 아닌데, 클래스를 사용했던 것 같습니다.


인스턴스를 사용하지 않는 클래스 사용을 주의하겠습니다.

인스턴스를 생성하지 않는 클래스를 만든 이유를 생각해봤는데, 문제가

저는 app을 생성한다는 의미로 new App();을 사용했는데,
왜 린트가 저런 에러를 발생시키는지

클래스를 사용하는 이유에는 여러가지가 있겠지만,


클래스의 의미에 대해서 생각해보았습니다. 저는 이


*/
