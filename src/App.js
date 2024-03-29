import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { colors, maxStripeCount, stripeOptions } from "./config.js";
import "./index.css";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
`;

const SelectContainer = styled.div`
  width: 150px;
  margin-right: 20px;
`;

const SelectHeader = styled.h5``;

const StripesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Pattern = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button``;

const Results = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Stripe = styled.div`
  background: ${props => props.color};
  height: 5px;
  width: 200px;
`;

const App = () => {
  const createMagnitudeOptions = (start, end) => {
    let options = [];

    if (start % 2 === 0) {
      for (let i = Number(start); i <= end; i += 2) {
        options.push({ value: i, label: i });
      }
    } else {
      for (let i = start; i <= end; i++) {
        options.push({ value: i, label: i });
      }
    }
    return options;
  };

  const createPalindromicArrays = (length, total) => {
    let results = [];

    if (length === 1 && total > 0) {
      results.push(total);
    } else if (length === 2 && total % 2 === 0 && total > 0) {
      results.push([total / 2, total / 2]);
    } else if (2 < length && length <= total) {
      for (let i = 1; i <= total / 2; i++) {
        const middles = createPalindromicArrays(length - 2, total - 2 * i);
        middles.forEach(middle => results.push([i].concat(middle, [i])));
      }
    }
    return results;
  };

  const createPattern = sequence => {
    let pattern = [];

    for (let i = 0; i < sequence.length; i++) {
      for (let j = 1; j <= sequence[i]; j++) {
        pattern.push(
          <Stripe key={Math.random()} color={colors[sequence[i]]} />
        );
      }
    }

    return <Pattern>{pattern}</Pattern>;
  };

  const [stripeCount, setStripeCount] = useState(null);
  const [magnitude, setMagnitude] = useState(null);
  const [magnitudeOptions, setMagnitudeOptions] = useState(null);
  const [palindromicArrays, setPalindromicArrays] = useState([]);

  return (
    <Container>
      <SelectContainer>
        <SelectHeader>Select stripe count</SelectHeader>
        <Select
          options={stripeOptions}
          onChange={option => {
            setStripeCount(option.value);
            setMagnitude(null);
            setMagnitudeOptions(
              createMagnitudeOptions(option.value, maxStripeCount)
            );
          }}
        />
        <SelectHeader>Select magnitude</SelectHeader>
        <Select
          options={magnitudeOptions}
          value={magnitude && { value: magnitude, label: magnitude }}
          onChange={option => {
            setMagnitude(option.value);
          }}
        />
        <Results>
          {stripeCount && magnitude && (
            <Button
              onClick={() =>
                setPalindromicArrays(
                  createPalindromicArrays(stripeCount, magnitude)
                )
              }
            >
              Make arrays
            </Button>
          )}
        </Results>
      </SelectContainer>
      <StripesContainer>
        {palindromicArrays.map(sequence => createPattern(sequence))}
      </StripesContainer>
    </Container>
  );
};

export default App;
