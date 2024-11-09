import Array "mo:base/Array";
actor {
  stable var submittedNames : [Text] = [];

  public shared(_msg) func greet(name : Text) : async Text {
    submittedNames := Array.append(submittedNames, [name]);
    return "GM!, " # name # "!";
  };

  public query func getSubmittedNames() : async [Text] {
    return submittedNames;
  };
};