import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const SubContainer = styled.View`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
`;

export const Info = styled.View`
  margin-left: 15px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 30px;
  color: #333;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
