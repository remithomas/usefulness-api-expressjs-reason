open Jest;

let () =
  describe(
    "Unit - Server",
    ExpectJs.(
      () => {
        test(
          "it should test",
          () => {
            expect(true) |> toEqual(true);
          }
				);
      }
    )
  );

